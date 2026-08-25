"use client";

import { useState, useEffect, useCallback } from "react";
import { cartService } from "@/lib/api/services";
import type { CartItemDTO } from "@/lib/api/generated";
import { getAuthToken, getAuthUserId } from "@/lib/auth/tokenStorage";

const CART_STORAGE_KEY = "librellis_cart_id";

export type FormatType = "paper" | "ebook" | "audio";

export interface CartFormatQuantities {
  paper: number;
  ebook: number;
  audio: number;
}

export interface CartItem {
  productId: number;
  formatQuantities: CartFormatQuantities;
}

function resolveAuthenticatedCartId(): string | null {
  const userId = getAuthUserId();
  const token = getAuthToken();
  if (!userId || !token) return null;

  // Keep storage in sync with the logged-in member (Carts API requires JWT).
  try {
    localStorage.setItem(CART_STORAGE_KEY, userId);
  } catch {
    // ignore storage errors
  }
  return userId;
}

function groupCartItems(dtos: CartItemDTO[]): CartItem[] {
  const grouped = new Map<number, CartItem>();
  for (const dto of dtos) {
    if (dto.productId == null) continue;
    if (!grouped.has(dto.productId)) {
      grouped.set(dto.productId, {
        productId: dto.productId,
        formatQuantities: { paper: 0, ebook: 0, audio: 0 },
      });
    }
    const group = grouped.get(dto.productId)!;
    const format = (dto.format || "paper") as FormatType;
    if (format === "paper" || format === "ebook" || format === "audio") {
      group.formatQuantities[format] += dto.quantity || 0;
    }
  }
  return Array.from(grouped.values());
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [rawItems, setRawItems] = useState<CartItemDTO[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncCartOwner = () => {
      const id = resolveAuthenticatedCartId();
      setCartId(id);
      if (!id) {
        setItems([]);
        setRawItems([]);
      }
    };

    syncCartOwner();
    window.addEventListener("auth-change", syncCartOwner);
    window.addEventListener("storage", syncCartOwner);
    return () => {
      window.removeEventListener("auth-change", syncCartOwner);
      window.removeEventListener("storage", syncCartOwner);
    };
  }, []);

  const refreshCart = useCallback(async (currentCartId: string) => {
    try {
      const cart = await cartService.apiCartsClubMemberIdGet({
        clubMemberId: currentCartId,
      });
      const dtos = cart?.cartItems || [];
      setRawItems(dtos);
      setItems(groupCartItems(dtos));
    } catch (e) {
      console.error("Failed to fetch cart", e);
      setItems([]);
      setRawItems([]);
    }
  }, []);

  useEffect(() => {
    if (cartId) {
      void refreshCart(cartId);
    }
  }, [cartId, refreshCart]);

  const addToCart = useCallback(
    async (productId: number, format: FormatType = "paper"): Promise<boolean> => {
      const memberId = resolveAuthenticatedCartId();
      if (!memberId) return false;

      if (memberId !== cartId) {
        setCartId(memberId);
      }

      try {
        await cartService.apiCartsClubMemberIdItemsPost({
          clubMemberId: memberId,
          cartItemDTO: {
            productId,
            quantity: 1,
            format,
          },
        });
        await refreshCart(memberId);
        return true;
      } catch (e) {
        console.error("Failed to add to cart", e);
        return false;
      }
    },
    [cartId, refreshCart],
  );

  const removeFromCart = useCallback(
    async (productId: number): Promise<boolean> => {
      const memberId = resolveAuthenticatedCartId() ?? cartId;
      if (!memberId) return false;

      try {
        const toDelete = rawItems.filter((d) => d.productId === productId);
        for (const dto of toDelete) {
          if (dto.id != null) {
            await cartService.apiCartsClubMemberIdItemsCartItemIdDelete({
              clubMemberId: memberId,
              cartItemId: dto.id,
            });
          }
        }
        await refreshCart(memberId);
        return true;
      } catch (e) {
        console.error("Failed to remove from cart", e);
        return false;
      }
    },
    [cartId, refreshCart, rawItems],
  );

  const updateFormatQuantity = useCallback(
    async (
      productId: number,
      format: FormatType,
      quantity: number,
    ): Promise<boolean> => {
      const memberId = resolveAuthenticatedCartId() ?? cartId;
      if (!memberId) return false;

      try {
        const target = rawItems.find(
          (d) =>
            d.productId === productId &&
            (d.format === format || (!d.format && format === "paper")),
        );

        if (target && target.id != null) {
          await cartService.apiCartsClubMemberIdItemsCartItemIdPut({
            clubMemberId: memberId,
            cartItemId: target.id,
            body: quantity,
          });
        } else if (quantity > 0) {
          await cartService.apiCartsClubMemberIdItemsPost({
            clubMemberId: memberId,
            cartItemDTO: {
              productId,
              quantity,
              format,
            },
          });
        }
        await refreshCart(memberId);
        return true;
      } catch (e) {
        console.error("Failed to update cart quantity", e);
        return false;
      }
    },
    [cartId, refreshCart, rawItems],
  );

  const clearCart = useCallback(async (): Promise<boolean> => {
    const memberId = resolveAuthenticatedCartId() ?? cartId;
    if (!memberId) return false;

    try {
      await cartService.apiCartsClubMemberIdDelete({ clubMemberId: memberId });
      await refreshCart(memberId);
      return true;
    } catch (e) {
      console.error("Failed to clear cart", e);
      return false;
    }
  }, [cartId, refreshCart]);

  const totalItemsCount = items.reduce(
    (sum, item) =>
      sum +
      item.formatQuantities.paper +
      item.formatQuantities.ebook +
      item.formatQuantities.audio,
    0,
  );

  return {
    items,
    cartId,
    isAuthenticatedCart: Boolean(cartId),
    addToCart,
    removeFromCart,
    updateFormatQuantity,
    clearCart,
    totalItemsCount,
  };
}

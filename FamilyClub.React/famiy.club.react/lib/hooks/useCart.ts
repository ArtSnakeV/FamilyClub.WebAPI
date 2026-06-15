"use client";

import { useState, useEffect, useCallback } from "react";
import { cartService } from "@/lib/api/services";
import type { CartItemDTO } from "@/lib/api/generated";

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

function generateGuestId() {
  return "guest_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [rawItems, setRawItems] = useState<CartItemDTO[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let storedId = localStorage.getItem(CART_STORAGE_KEY);
    if (!storedId) {
      storedId = generateGuestId();
      localStorage.setItem(CART_STORAGE_KEY, storedId);
    }
    setCartId(storedId);
  }, []);

  const refreshCart = useCallback(async (currentCartId: string) => {
    try {
      const cart = await cartService.apiCartsClubMemberIdGet({ clubMemberId: currentCartId });
      const dtos = cart?.cartItems || [];
      setRawItems(dtos);
      
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
          group.formatQuantities[format] += (dto.quantity || 0);
        }
      }
      setItems(Array.from(grouped.values()));
    } catch (e) {
      console.error("Failed to fetch cart", e);
    }
  }, []);

  useEffect(() => {
    if (cartId) {
      refreshCart(cartId);
    }
  }, [cartId, refreshCart]);

  const addToCart = useCallback(
    async (productId: number, format: FormatType = "paper") => {
      if (!cartId) return;
      try {
        await cartService.apiCartsClubMemberIdItemsPost({
          clubMemberId: cartId,
          cartItemDTO: {
            productId,
            quantity: 1,
            format: format
          }
        });
        await refreshCart(cartId);
      } catch (e) {
        console.error("Failed to add to cart", e);
      }
    },
    [cartId, refreshCart]
  );

  const removeFromCart = useCallback(
    async (productId: number) => {
      if (!cartId) return;
      try {
        const toDelete = rawItems.filter(d => d.productId === productId);
        for (const dto of toDelete) {
          if (dto.id != null) {
            await cartService.apiCartsClubMemberIdItemsCartItemIdDelete({
              clubMemberId: cartId,
              cartItemId: dto.id
            });
          }
        }
        await refreshCart(cartId);
      } catch (e) {
        console.error("Failed to remove from cart", e);
      }
    },
    [cartId, refreshCart, rawItems]
  );

  const updateFormatQuantity = useCallback(
    async (productId: number, format: FormatType, quantity: number) => {
      if (!cartId) return;
      try {
        const target = rawItems.find(d => d.productId === productId && (d.format === format || (!d.format && format === "paper")));
        
        if (target && target.id != null) {
          await cartService.apiCartsClubMemberIdItemsCartItemIdPut({
            clubMemberId: cartId,
            cartItemId: target.id,
            body: quantity
          });
        } else if (quantity > 0) {
          await cartService.apiCartsClubMemberIdItemsPost({
            clubMemberId: cartId,
            cartItemDTO: {
              productId,
              quantity: quantity,
              format: format
            }
          });
        }
        await refreshCart(cartId);
      } catch (e) {
        console.error("Failed to update cart quantity", e);
      }
    },
    [cartId, refreshCart, rawItems]
  );

  const clearCart = useCallback(async () => {
    if (!cartId) return;
    try {
      await cartService.apiCartsClubMemberIdDelete({ clubMemberId: cartId });
      await refreshCart(cartId);
    } catch (e) {
      console.error("Failed to clear cart", e);
    }
  }, [cartId, refreshCart]);

  const totalItemsCount = items.reduce(
    (sum, item) => sum + item.formatQuantities.paper + item.formatQuantities.ebook + item.formatQuantities.audio,
    0
  );

  return { items, addToCart, removeFromCart, updateFormatQuantity, clearCart, totalItemsCount };
}

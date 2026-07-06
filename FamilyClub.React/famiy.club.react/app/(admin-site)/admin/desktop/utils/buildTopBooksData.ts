import type { AuthorDTO, OrderDTO, ProductDto } from "@/lib/api/generated";
import { normalizeOrderStatusGroup } from "@/lib/constants/orderStatusGroups";

export type TopBookEntry = {
  productId: number;
  rank: number;
  name: string;
  authorName: string;
  coverSrc: string | null;
  salesCount: number;
};

function isCountableOrder(order: OrderDTO): boolean {
  if (!order.orderDate) return false;
  return normalizeOrderStatusGroup(order.status) !== "cancelled";
}

export function getProductCoverSrc(product?: ProductDto | null): string | null {
  if (!product) return null;
  const image = product.productImages?.[0];
  if (!image?.imageData) return null;

  const normalizedData = image.imageData.trim();
  if (normalizedData.startsWith("data:")) {
    return normalizedData;
  }

  const mimeType = (() => {
    if (normalizedData.startsWith("UklGR")) return "image/webp";
    if (normalizedData.startsWith("/9j/")) return "image/jpeg";
    if (normalizedData.startsWith("iVBORw0KGgo")) return "image/png";
    if (normalizedData.startsWith("R0lGOD")) return "image/gif";

    const extension = image.imageName?.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "webp":
        return "image/webp";
      case "png":
        return "image/png";
      case "gif":
        return "image/gif";
      default:
        return "image/jpeg";
    }
  })();

  return `data:${mimeType};base64,${normalizedData}`;
}

export function formatSalesCount(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} продаж`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} продажі`;
  }
  return `${count} продажів`;
}

export function getProductAuthorName(
  product: ProductDto | undefined,
  authors: AuthorDTO[] = []
): string {
  if (!product?.authorIds?.length) return "";
  const authorsById = new Map(
    authors.filter((a) => a.id != null).map((a) => [a.id as number, a.authorName ?? ""])
  );
  return product.authorIds
    .map((id) => authorsById.get(id))
    .filter(Boolean)
    .join(", ");
}

export function buildTopBooksData(
  orders: OrderDTO[],
  products: ProductDto[],
  authors: AuthorDTO[] = [],
  limit = 5
): TopBookEntry[] {
  const productMap = new Map(
    products.filter((p) => p.id != null).map((p) => [p.id as number, p])
  );
  const counts = new Map<number, number>();

  for (const order of orders) {
    if (!isCountableOrder(order)) continue;
    for (const item of order.orderItems ?? []) {
      if (item.productId == null) continue;
      const qty = item.quantity ?? 1;
      counts.set(item.productId, (counts.get(item.productId) ?? 0) + qty);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([productId, salesCount], index) => {
      const product = productMap.get(productId);
      return {
        productId,
        rank: index + 1,
        name: product?.productName?.trim() || `Товар #${productId}`,
        authorName: getProductAuthorName(product, authors),
        coverSrc: getProductCoverSrc(product),
        salesCount,
      };
    });
}

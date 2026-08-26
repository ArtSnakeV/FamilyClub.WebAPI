import type { AuthorDTO, ProductDto } from "@/lib/api/generated";
import { getProductCoverUrl } from "@/lib/products/productCoverUrl";

export function getProductCoverSrc(product?: ProductDto | null): string | null {
  return getProductCoverUrl(product);
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

export function getProductPriceAmount(product: ProductDto): string {
  const value = product.discountPrice ?? product.price ?? 0;
  return new Intl.NumberFormat("uk-UA").format(value);
}

export function formatProductPrice(product: ProductDto): string {
  return `Ціна: ${getProductPriceAmount(product)} грн`;
}

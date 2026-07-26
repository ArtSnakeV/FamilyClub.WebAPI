import type { AuthorDTO, ProductDto } from "@/lib/api/generated";

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

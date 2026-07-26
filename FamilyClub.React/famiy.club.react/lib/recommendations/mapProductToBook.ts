import type { AuthorDTO, FormatDto, ProductDto } from "@/lib/api/generated";

export type BookCardModel = {
  productId?: number;
  href?: string;
  title: string;
  author?: string | null;
  price: string;
  image?: string | null;
  rating?: number | null;
  formatTags?: Array<"paper" | "ebook" | "audio">;
};

export function formatBookPrice(value?: number | null) {
  if (value == null) return "";
  return `${new Intl.NumberFormat("uk-UA").format(value)} грн`;
}

export function getProductImageSrc(product: ProductDto) {
  const image = product.productImages?.[0];
  if (!image?.imageData) return null;
  const normalizedData = image.imageData.trim();
  if (
    normalizedData.startsWith("data:") ||
    normalizedData.startsWith("http://") ||
    normalizedData.startsWith("https://") ||
    normalizedData.startsWith("/")
  ) {
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

export function getAuthorLabel(
  authorIds: Array<number> | null | undefined,
  authorsById: Map<number, AuthorDTO>,
) {
  const names = (authorIds ?? [])
    .map((id) => authorsById.get(id)?.authorName)
    .filter((name): name is string => Boolean(name));
  return names.length ? names.join(", ") : null;
}

export function getFormatTags(
  formatIds: Array<number> | null | undefined,
  formatsById: Map<number, FormatDto>,
) {
  const tags = new Set<"paper" | "ebook" | "audio">();
  for (const formatId of formatIds ?? []) {
    const format = formatsById.get(formatId);
    const label = `${format?.name ?? ""} ${format?.code ?? ""}`.toLowerCase();
    if (!label) continue;
    if (label.includes("audio") || label.includes("аудіо")) tags.add("audio");
    if (
      label.includes("ebook") ||
      label.includes("e-book") ||
      label.includes("електрон")
    ) {
      tags.add("ebook");
    }
    if (
      label.includes("paper") ||
      label.includes("print") ||
      label.includes("папер")
    ) {
      tags.add("paper");
    }
  }
  return Array.from(tags);
}

export function mapProductToBookCard(
  product: ProductDto,
  options: {
    rating: number | null;
    authorsById: Map<number, AuthorDTO>;
    formatsById: Map<number, FormatDto>;
  },
): BookCardModel {
  return {
    productId: product.id,
    href: product.id ? `/products/${product.id}` : undefined,
    title: product.productName ?? "",
    author: getAuthorLabel(product.authorIds, options.authorsById),
    price: formatBookPrice(product.discountPrice ?? product.price),
    image: getProductImageSrc(product),
    rating: options.rating,
    formatTags: getFormatTags(product.formatIds, options.formatsById),
  };
}

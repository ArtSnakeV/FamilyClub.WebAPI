import { ProductDto } from "@/lib/api/generated";

export function getImageSrc(book: ProductDto): string | null {
  const img = book.productImages?.[0];
  if (!img?.imageData) return null;
  const normalizedData = img.imageData.trim();
  if (normalizedData.startsWith("data:") || normalizedData.startsWith("http://") || normalizedData.startsWith("https://") || normalizedData.startsWith("/")) return normalizedData;
  const mimeType = (() => {
    if (normalizedData.startsWith("UklGR")) return "image/webp";
    if (normalizedData.startsWith("/9j/")) return "image/jpeg";
    if (normalizedData.startsWith("iVBORw0KGgo")) return "image/png";
    if (normalizedData.startsWith("R0lGOD")) return "image/gif";
    return "image/jpeg";
  })();
  return `data:${mimeType};base64,${normalizedData}`;
}

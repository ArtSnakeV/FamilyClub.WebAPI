import { ProductDto } from "@/lib/api/generated";

export function getImageSrc(book: ProductDto): string | null {
  const img = book.productImages?.[0];
  if (!img) return null;
  if (img.imageData) return `data:image/jpeg;base64,${img.imageData}`;
  return null;
}

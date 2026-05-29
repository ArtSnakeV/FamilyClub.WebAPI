import { Availability, CoverType } from "@/lib/api/generated";

export type ProductDto = {
  productName: string;
  price?: number;
  discountPrice?: number;
  description?: string;
  publisherId?: number;
  pageCount?: number;
  publishingYear?: number;
  isbn?: string;
  weightGrams?: number;
  itemsInSet?: number;
  categoryIds: number[];
  languageId?: number;
  coverType: CoverType;
  availability?: Availability;
  authorIds?: number[];
  formatIds?: number[];
  ageRestrictionIds?: number[];
  leaveOldImages: boolean;
  quantityInStock?: number;
  bookSizeIds: number[];
};

export type ImageUploadState = {
  mainImage: File | null;
  mainPreview: string | null;
  gallery: (File | null)[];
  handleMainChange: (file: File | null) => void;
  handleGalleryChange: (index: number, file: File | null) => void;
};

import { useState } from "react";
import { CoverType } from "@/lib/api/generated";
import { ProductDto } from "@/app/addProduct/types";

const initialDto: ProductDto = {
  productName: "",
  description: "",
  pageCount: undefined,
  itemsInSet: 1,
  ageRestrictions: undefined,
  categoryIds: [],
  languageId: undefined,
  coverType: CoverType.NUMBER_0,
  availability: undefined,
  leaveOldImages: false,
  quantityInStock: undefined,
  bookSizeIds: [],
  publisherId: undefined,
  authorIds: [],
  formatIds: [],
  price: undefined,
  discountPrice: undefined,
  isbn: undefined,
  publishingYear: undefined,
};

export function useProductForm() {
  const [form, setForm] = useState<ProductDto>(initialDto);

  const setField = <K extends keyof ProductDto>(key: K, value: ProductDto[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleCategory = (id: number) =>
    setField(
      "categoryIds",
      form.categoryIds.includes(id)
        ? form.categoryIds.filter((c) => c !== id)
        : [...form.categoryIds, id],
    );

  return { form, setField, toggleCategory };
}
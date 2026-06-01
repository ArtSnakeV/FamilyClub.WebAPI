import { useState } from "react";
import { CoverType } from "@/lib/api/generated";
import { ProductDto } from "@/app/(user-site)/addProduct/types";

const initialDto: ProductDto = {
  productName: "",
  description: "",
  pageCount: undefined,
  itemsInSet: 1,
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
  ageRestrictionIds: [],
  price: undefined,
  discountPrice: undefined,
  isbn: undefined,
  publishingYear: undefined,
};

const DRAFT_KEY = "productDraft";

export function useProductForm() {
  //const [form, setForm] = useState<ProductDto>(initialDto);
  const [form, setForm] = useState<ProductDto>(() => {
    // відновлюємо чернетку при ініціалізації
    const saved = localStorage.getItem(DRAFT_KEY);
    return saved ? JSON.parse(saved) : initialDto;
  });
  const setField = <K extends keyof ProductDto>(key: K, value: ProductDto[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const saveDraft = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    alert("Чернетку збережено");
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setForm(initialDto);
  };

  const toggleCategory = (id: number) =>
    setField(
      "categoryIds",
      form.categoryIds.includes(id)
        ? form.categoryIds.filter((c) => c !== id)
        : [...form.categoryIds, id],
    );

  return { form, setField, toggleCategory, saveDraft, clearDraft };
}

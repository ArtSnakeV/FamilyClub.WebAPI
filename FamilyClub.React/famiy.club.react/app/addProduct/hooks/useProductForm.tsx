import { useState } from "react";
import { CoverType } from "@/lib/api/generated";
import { ProductDto } from "@/app/addProduct/types";

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
const storage = {
  get: (key: string): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  },
  set: (key: string, value: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  },
  remove: (key: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
};
const getInitialForm = (): ProductDto => {
  const saved = storage.get(DRAFT_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialDto;
    }
  }
  return initialDto;
};
export function useProductForm() {
  const [form, setForm] = useState<ProductDto>(getInitialForm);

  const setField = <K extends keyof ProductDto>(key: K, value: ProductDto[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const saveDraft = () => {
    storage.set(DRAFT_KEY, JSON.stringify(form));
    alert("Чернетку збережено");
  };

  const clearDraft = () => {
    storage.remove(DRAFT_KEY);
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

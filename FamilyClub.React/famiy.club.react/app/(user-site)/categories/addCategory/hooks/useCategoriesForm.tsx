import { useState } from "react";
import { CategoryDto } from "../types";

const initialForm: CategoryDto = {
  categoryName: "",
};

export function useCategoriesForm() {
  const [form, setForm] = useState<CategoryDto>(initialForm);

  const setField = <K extends keyof CategoryDto>(key: K, value: CategoryDto[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return { form, setField };
}
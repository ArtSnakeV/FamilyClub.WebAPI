import { useState } from "react";
import { LanguageDto } from "../types";

const initialForm: LanguageDto = {
  languageName: "",
};

export function useLanguageForm() {
  const [form, setForm] = useState<LanguageDto>(initialForm);

  const setField = <K extends keyof LanguageDto>(key: K, value: LanguageDto[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return { form, setField };
}
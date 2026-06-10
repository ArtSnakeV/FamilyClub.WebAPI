import { useState } from "react";
import { TranslatorDto } from "../types";

const initialForm: TranslatorDto = {
  translatorName: "",
};

export function useTranslatorForm() {
  const [form, setForm] = useState<TranslatorDto>(initialForm);

  const setField = <K extends keyof TranslatorDto>(key: K, value: TranslatorDto[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return { form, setField };
}
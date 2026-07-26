import { useState } from "react";
import { BookSizeFormDto } from "../types";

const initialForm: BookSizeFormDto = {
  name: "",
  code: "",
};

export function useBookSizeForm() {
  const [form, setForm] = useState<BookSizeFormDto>(initialForm);

  const setField = <K extends keyof BookSizeFormDto>(
    key: K,
    value: BookSizeFormDto[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  return { form, setField };
}

import { useState } from "react";
import { FormatFormDto } from "../types";

const initialForm: FormatFormDto = {
  name: "",
  code: "",
};

export function useFormatForm() {
  const [form, setForm] = useState<FormatFormDto>(initialForm);

  const setField = <K extends keyof FormatFormDto>(
    key: K,
    value: FormatFormDto[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  return { form, setField };
}

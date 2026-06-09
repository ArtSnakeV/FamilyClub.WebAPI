import { useState } from "react";
import { PublisherDto } from "../types";

const initialForm: PublisherDto = {
  publisherName: "",
};

export function usePublisherForm() {
  const [form, setForm] = useState<PublisherDto>(initialForm);

  const setField = <K extends keyof PublisherDto>(key: K, value: PublisherDto[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return { form, setField };
}
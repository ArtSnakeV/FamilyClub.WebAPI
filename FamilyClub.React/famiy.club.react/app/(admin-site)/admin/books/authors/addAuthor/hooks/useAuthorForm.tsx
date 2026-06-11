import { useState } from "react";
import { AuthorDto } from "@/app/(admin-site)/admin/books/authors/addAuthor/types";

const initialForm: AuthorDto = {
  authorName: "",
  biography: "",
  photoUrl: "",
};

export function useAuthorForm() {
  const [form, setForm] = useState<AuthorDto>(initialForm);

  const setField = <K extends keyof AuthorDto>(key: K, value: AuthorDto[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return { form, setField };
}
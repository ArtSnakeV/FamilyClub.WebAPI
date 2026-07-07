import { useEffect, useState } from "react";
import { BookSizeFormDto } from "@/app/(admin-site)/admin/books/bookSizes/addBookSize/types";
import { bookSizeService } from "@/lib/api/services";

const emptyForm: BookSizeFormDto = {
  name: "",
  code: "",
};

export default function useEditBookSizeForm(id: number) {
  const [form, setForm] = useState<BookSizeFormDto>(emptyForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookSizeService
      .apiBookSizesIdGet({ id })
      .then((bookSize) => {
        setForm({
          name: bookSize.name ?? "",
          code: bookSize.code ?? "",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const setField = <K extends keyof BookSizeFormDto>(
    key: K,
    value: BookSizeFormDto[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return { form, setField, loading };
}

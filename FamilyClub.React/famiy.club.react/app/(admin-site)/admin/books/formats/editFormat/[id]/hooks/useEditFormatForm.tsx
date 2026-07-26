import { useEffect, useState } from "react";
import { FormatFormDto } from "@/app/(admin-site)/admin/books/formats/addFormat/types";
import { formatService } from "@/lib/api/services";

const emptyForm: FormatFormDto = {
  name: "",
  code: "",
};

export default function useEditFormatForm(id: number) {
  const [form, setForm] = useState<FormatFormDto>(emptyForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    formatService
      .apiFormatsIdGet({ id })
      .then((format) => {
        setForm({
          name: format.name ?? "",
          code: format.code ?? "",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const setField = <K extends keyof FormatFormDto>(
    key: K,
    value: FormatFormDto[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return { form, setField, loading };
}

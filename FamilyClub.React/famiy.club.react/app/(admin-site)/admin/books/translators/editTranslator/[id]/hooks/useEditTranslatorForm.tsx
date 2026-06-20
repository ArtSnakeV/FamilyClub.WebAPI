import { useEffect, useState } from "react";
import { TranslatorDto } from "@/app/(admin-site)/admin/books/translators/addTranslator/types";
import { translatorService } from "@/lib/api/services";

const emptyForm: TranslatorDto = {
  translatorName: "",
};

export default function useEditTranslatorForm(id: number) {
  const [form, setForm] = useState<TranslatorDto>(emptyForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    translatorService
      .apiTranslatorsIdGet({ id })
      .then((translator) => {
        setForm({
          translatorName: translator.translatorName ?? "",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const setField = <K extends keyof TranslatorDto>(
    key: K,
    value: TranslatorDto[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return { form, setField, loading };
}
import { useEffect, useState } from "react";
import { LanguageDto } from "@/app/(admin-site)/admin/books/languages/addLanguage/types";
import { languageService } from "@/lib/api/services";

const emptyForm: LanguageDto = {
  languageName: "",
};

export default function useEditLanguageForm(id: number) {
  const [form, setForm] = useState<LanguageDto>(emptyForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    languageService
      .apiLanguagesIdGet({ id })
      .then((language) => {
        setForm({
          languageName: language.languageName ?? "",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const setField = <K extends keyof LanguageDto>(
    key: K,
    value: LanguageDto[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return { form, setField, loading };
}
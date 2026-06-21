import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { LanguageDto } from "@/app/(admin-site)/admin/books/languages/addLanguage/types";
import { languageService } from "@/lib/api/services";

type Props = {
  id: number;
  form: LanguageDto;
  router: AppRouterInstance;
};

export default function useSubmitEditLanguage({ id, form, router }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await languageService.apiLanguagesIdPut({
        id,
        languageDto: {
          languageName: form.languageName,
        },
      });

      router.push("/admin/books/languages");
    } catch (e) {
      console.error(e);
      alert("Помилка при редагуванні мови");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    const confirmDelete = confirm("Ви точно хочете видалити цю мову?");
    if (!confirmDelete) return;

    try {
      await languageService.apiLanguagesIdDelete({
        id: Number(id),
      });
      router.push("/admin/books/languages");
    } catch (e) {
      console.error(e);
      alert("Помилка при видаленні мови");
    }
  };
  return { handleSubmit, loading, handleDelete };
}

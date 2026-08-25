import { alertError, showConfirm } from "@/lib/ui/sweetAlert";
import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { TranslatorDto } from "@/app/(admin-site)/admin/books/translators/addTranslator/types";
import { translatorService } from "@/lib/api/services";

type Props = {
  id: number;
  form: TranslatorDto;
  router: AppRouterInstance;
};

export default function useSubmitEditTranslator({ id, form, router }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await translatorService.apiTranslatorsIdPut({
        id,
        translatorDto: {
          translatorName: form.translatorName,
        },
      });

      router.push("/admin/books/translators");
    } catch (e) {
      console.error(e);
      await alertError("Помилка при редагуванні перекладача");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    const confirmDelete = await showConfirm("Ви точно хочете видалити цього перекладача?");
    if (!confirmDelete) return;

    try {
      await translatorService.apiTranslatorsIdDelete({
        id: Number(id),
      });
      router.push("/admin/books/translators");
    } catch (e) {
      console.error(e);
      await alertError("Помилка при видаленні перекладача");
    }
  };
  return { handleSubmit, loading, handleDelete };
}

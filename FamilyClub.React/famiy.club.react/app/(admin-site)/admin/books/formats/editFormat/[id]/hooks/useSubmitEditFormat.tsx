import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FormatFormDto } from "@/app/(admin-site)/admin/books/formats/addFormat/types";
import { formatService } from "@/lib/api/services";

type Props = {
  id: number;
  form: FormatFormDto;
  router: AppRouterInstance;
};

export default function useSubmitEditFormat({ id, form, router }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await formatService.apiFormatsIdPut({
        id,
        formatDto: {
          name: form.name,
          code: form.code,
        },
      });

      router.push("/admin/books/formats");
    } catch (e) {
      console.error(e);
      alert("Помилка при редагуванні формату");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Ви точно хочете видалити цей формат?");
    if (!confirmDelete) return;

    try {
      await formatService.apiFormatsIdDelete({ id: Number(id) });
      router.push("/admin/books/formats");
    } catch (e) {
      console.error(e);
      alert("Помилка при видаленні формату");
    }
  };

  return { handleSubmit, loading, handleDelete };
}

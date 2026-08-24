import { alertError, showConfirm } from "@/lib/ui/sweetAlert";
import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BookSizeFormDto } from "@/app/(admin-site)/admin/books/bookSizes/addBookSize/types";
import { bookSizeService } from "@/lib/api/services";

type Props = {
  id: number;
  form: BookSizeFormDto;
  router: AppRouterInstance;
};

export default function useSubmitEditBookSize({ id, form, router }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await bookSizeService.apiBookSizesIdPut({
        id,
        bookSizeDto: {
          name: form.name,
          code: form.code,
        },
      });

      router.push("/admin/books/bookSizes");
    } catch (e) {
      console.error(e);
      await alertError("Помилка при редагуванні розміру книги");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = await showConfirm("Ви точно хочете видалити цей розмір книги?");
    if (!confirmDelete) return;

    try {
      await bookSizeService.apiBookSizesIdDelete({ id: Number(id) });
      router.push("/admin/books/bookSizes");
    } catch (e) {
      console.error(e);
      await alertError("Помилка при видаленні розміру книги");
    }
  };

  return { handleSubmit, loading, handleDelete };
}

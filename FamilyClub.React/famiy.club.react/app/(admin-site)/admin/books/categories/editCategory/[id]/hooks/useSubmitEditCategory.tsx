import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CategoryDto } from "@/app/(admin-site)/admin/books/categories/addCategory/types";
import { categoriesService } from "@/lib/api/services";

type Props = {
  id: number;
  form: CategoryDto;
  router: AppRouterInstance;
};

export default function useSubmitEditCategory({ id, form, router }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await categoriesService.apiCategoriesIdPut({
        id,
        categoryDto: {
          categoryName: form.categoryName,
        },
      });

      router.push("/admin/books/categories");
    } catch (e) {
      console.error(e);
      alert("Помилка при редагуванні категорії");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    const confirmDelete = confirm("Ви точно хочете видалити категорію?");
    if (!confirmDelete) return;

    try {
      await categoriesService.apiCategoriesIdDelete({
        id: Number(id),
      });
      router.push("/admin/books/categories");
    } catch (e) {
      console.error(e);
      alert("Помилка при видаленні категорії");
    }
  };
  return { handleSubmit, loading, handleDelete };
}

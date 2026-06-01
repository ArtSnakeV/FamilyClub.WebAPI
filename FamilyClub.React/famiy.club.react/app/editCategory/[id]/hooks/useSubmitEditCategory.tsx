import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CategoryDto } from "@/app/addCategory/types";
import { categoriesApi } from "@/app/addCategory/api/categoryApiClient";
//import { publisherApi } from "@/app/addPublisher/api/publisherApiClient";

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
      await categoriesApi.apiCategoriesIdPut({
        id,
        categoryDto: {
          categoryName: form.categoryName,
        },
      });

      router.push("/categories");
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
      await categoriesApi.apiCategoriesIdDelete({
        id: Number(id),
      });
      router.push("/categories");
    } catch (e) {
      console.error(e);
      alert("Помилка при видаленні");
    }
  };
  return { handleSubmit, loading, handleDelete };
}

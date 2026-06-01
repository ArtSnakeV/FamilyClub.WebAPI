import { categoriesApi } from "@/app/addCategory/api/categoryApiClient";
import { CategoryDto } from "@/app/addCategory/types";
import { useEffect, useState } from "react";

const emptyForm: CategoryDto = {
  categoryName: "",
};

export default function useEditCategoryForm(id: number) {
  const [form, setForm] = useState<CategoryDto>(emptyForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoriesApi
      .apiCategoriesIdGet({ id })
      .then((category) => {
        setForm({
          categoryName: category.categoryName ?? "",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const setField = <K extends keyof CategoryDto>(
    key: K,
    value: CategoryDto[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return { form, setField, loading };
}
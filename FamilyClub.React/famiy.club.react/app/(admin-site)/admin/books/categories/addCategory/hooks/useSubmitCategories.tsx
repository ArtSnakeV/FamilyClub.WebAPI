import { useRef, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CategoryDto } from "../types";
import { categoriesApi } from "../api/categoryApiClient";

type Props = {
  form: CategoryDto;
  router: AppRouterInstance;
};

export function useSubmitCategories({ form, router }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    abortRef.current = new AbortController();
    const { signal } = abortRef.current;

    try {
      const createdCategories= await categoriesApi.apiCategoriesPost({
        categoryDto: {
          categoryName: form.categoryName,
        },
      });

      router.push("/admin/books/categories");
    } catch (err) {
      if ((err as { name?: string }).name === "AbortError") return;
      console.error(err);
      setError("Помилка при створенні категорії");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error };
}

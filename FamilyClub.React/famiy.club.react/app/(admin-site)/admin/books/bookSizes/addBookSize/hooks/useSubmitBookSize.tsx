import { useRef, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BookSizeFormDto } from "../types";
import { bookSizeService } from "@/lib/api/services";

type Props = {
  form: BookSizeFormDto;
  router: AppRouterInstance;
};

export function useSubmitBookSize({ form, router }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    abortRef.current = new AbortController();

    try {
      await bookSizeService.apiBookSizesPost({
        bookSizeDto: {
          name: form.name,
          code: form.code,
        },
      });

      router.push("/admin/books/bookSizes");
    } catch (err) {
      if ((err as { name?: string }).name === "AbortError") return;
      console.error(err);
      setError("Помилка при створенні розміру книги");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error };
}

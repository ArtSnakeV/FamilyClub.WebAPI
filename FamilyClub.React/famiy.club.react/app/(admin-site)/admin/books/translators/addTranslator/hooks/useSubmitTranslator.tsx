import { useRef, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { TranslatorDto } from "../types";
import { translatorApi } from "../api/translatorApiClient";

type Props = {
  form: TranslatorDto;
  router: AppRouterInstance;
};

export function useSubmitTranslator({ form, router }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    abortRef.current = new AbortController();
    const { signal } = abortRef.current;

    try {
      const createdTranslator= await translatorApi.apiTranslatorsPost({
        translatorDto: {
          translatorName: form.translatorName,
        },
      });

      router.push("/admin/books/translators");
    } catch (err) {
      if ((err as { name?: string }).name === "AbortError") return;
      console.error(err);
      setError("Помилка при створенні перекладача");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error };
}

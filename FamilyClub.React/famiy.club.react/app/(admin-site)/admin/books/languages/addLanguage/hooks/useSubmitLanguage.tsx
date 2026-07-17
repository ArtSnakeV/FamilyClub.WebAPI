import { useRef, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { LanguageDto } from "../types";
import { languageService } from "@/lib/api/services";

type Props = {
  form: LanguageDto;
  router: AppRouterInstance;
};

export function useSubmitLanguage({ form, router }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    abortRef.current = new AbortController();
    const { signal } = abortRef.current;

    try {
      const createdLanguage = await languageService.apiLanguagesPost({
        languageDto: {
          languageName: form.languageName,
        },
      });

      router.push("/admin/books/languages");
    } catch (err) {
      if ((err as { name?: string }).name === "AbortError") return;
      console.error(err);
      setError("Помилка при створенні мови");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error };
}

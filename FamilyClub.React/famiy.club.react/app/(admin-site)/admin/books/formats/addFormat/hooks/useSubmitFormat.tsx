import { useRef, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FormatFormDto } from "../types";
import { formatService } from "@/lib/api/services";

type Props = {
  form: FormatFormDto;
  router: AppRouterInstance;
};

export function useSubmitFormat({ form, router }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    abortRef.current = new AbortController();

    try {
      await formatService.apiFormatsPost({
        formatDto: {
          name: form.name,
          code: form.code,
        },
      });

      router.push("/admin/books/formats");
    } catch (err) {
      if ((err as { name?: string }).name === "AbortError") return;
      console.error(err);
      setError("Помилка при створенні формату");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error };
}

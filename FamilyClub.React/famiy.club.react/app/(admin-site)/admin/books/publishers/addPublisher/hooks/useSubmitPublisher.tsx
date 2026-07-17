import { useRef, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { PublisherDto } from "../types";
import { publisherService } from "@/lib/api/services";

type Props = {
  form: PublisherDto;
  router: AppRouterInstance;
};

export function useSubmitPublisher({ form, router }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    abortRef.current = new AbortController();
    const { signal } = abortRef.current;

    try {
      const createdPublisher= await publisherService.apiPublishersPost({
        publisherDto: {
          publisherName: form.publisherName,
        },
      });

      router.push("/admin/books/publishers");
    } catch (err) {
      if ((err as { name?: string }).name === "AbortError") return;
      console.error(err);
      setError("Помилка при створенні видавництва");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error };
}

import { useRef, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { authorsApi, BASE_URL  } from "@/app/(admin-site)/admin/books/authors/addAuthor/api/authorsApiClient";
import { AuthorDto } from "@/app/(admin-site)/admin/books/authors/addAuthor/types";

type Props = {
  form: AuthorDto;
  mainImage: File | null;
  router: AppRouterInstance;
};

export function useSubmitAuthor({ form, router, mainImage }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    abortRef.current = new AbortController();
    const { signal } = abortRef.current;

    try {
      const createdAuthor = await authorsApi.apiAuthorsPost({
        authorDTO: {
          authorName: form.authorName,
          biography: form.biography,
        },
      });

      const authorId = createdAuthor?.id;

      if (mainImage && authorId) {
        const formData = new FormData();
        formData.append("photo", mainImage);

        const response = await fetch(
          `${BASE_URL }/api/Authors/${authorId}/photo`,
          { method: "POST", body: formData, signal },
        );

        if (!response.ok) {
          throw new Error("Помилка завантаження фото");
        }
      }

      router.push("/authors");
    } catch (err) {
      if ((err as { name?: string }).name === "AbortError") return;
      console.error(err);
      setError("Помилка при створенні автора");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error };
}

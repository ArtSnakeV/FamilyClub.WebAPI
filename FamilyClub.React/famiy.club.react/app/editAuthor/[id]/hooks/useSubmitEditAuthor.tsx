import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AuthorDto } from "@/app/addAuthor/types";
import { authorService, apiBasePath } from "@/lib/api/services";

type Props = {
  id: number;
  form: AuthorDto;
  mainImage: File | null;
  router: AppRouterInstance;
};

export default function useSubmitEditAuthor({ id, form, mainImage, router }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await authorService.apiAuthorsIdPut({
        id,
        authorDTO: {
          authorName: form.authorName,
          biography: form.biography,
          photoUrl: form.photoUrl,
        },
      });

      if (mainImage) {
        const formData = new FormData();
        formData.append("photo", mainImage);

        const response = await fetch(`${apiBasePath}/api/Authors/${id}/photo`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Помилка завантаження фото");
      }

      router.push("/authors");
    } catch (e) {
      console.error(e);
      alert("Помилка при редагуванні автора");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
}
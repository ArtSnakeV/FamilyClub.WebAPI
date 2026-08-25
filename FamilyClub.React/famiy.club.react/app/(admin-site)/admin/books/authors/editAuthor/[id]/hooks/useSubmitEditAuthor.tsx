import { alertError } from "@/lib/ui/sweetAlert";
import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AuthorDto } from "@/app/(admin-site)/admin/books/authors/addAuthor/types";
import { authorService, apiBasePath } from "@/lib/api/services";
import { authHeaders } from "@/lib/api/authHeaders";

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
          headers: authHeaders(),
          body: formData,
        });

        if (!response.ok) throw new Error("Помилка завантаження фото");
      }

      router.push("/admin/books/authors");
    } catch (e) {
      console.error(e);
      await alertError("Помилка при редагуванні автора");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
}
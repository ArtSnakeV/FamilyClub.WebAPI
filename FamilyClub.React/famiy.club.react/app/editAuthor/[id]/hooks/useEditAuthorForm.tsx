import { authorsApi, BASE_URL  } from "@/app/addAuthor/api/authorsApiClient";
import { AuthorDto } from "@/app/addAuthor/types";
import { useEffect, useState } from "react";

const emptyForm: AuthorDto = {
  authorName: "",
  biography: "",
  photoUrl: "",
};

export default function useEditAuthorForm(id: number) {
  const [form, setForm] = useState<AuthorDto>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [initialPhotoUrl, setInitialPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    authorsApi
      .apiAuthorsIdGet({ id })
      .then((author) => {
        setForm({
          authorName: author.authorName ?? "",
          biography: author.biography ?? "",
          photoUrl: author.photoUrl ?? "",
        });
        setInitialPhotoUrl(
          author.photoUrl ? `${BASE_URL}${author.photoUrl}` : null
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  const setField = <K extends keyof AuthorDto>(key: K, value: AuthorDto[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return { form, setField, loading, initialPhotoUrl };
}

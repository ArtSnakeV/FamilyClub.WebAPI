'use client'; // Логіка клієнта (кліки, confirm, router)

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DeleteButton from '@/app/(admin-site)/common_elements/delete_button';
import { LanguagesApi, Configuration } from '@/lib/api/generated';

interface DeleteLanguageActionProps {
  languageId: number;
  languageName: string;
}

export default function DeleteLanguageAction({ languageId, languageName }: DeleteLanguageActionProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(`Ви впевнені, що хочете видалити мову "${languageName}"?`);
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const config = new Configuration({
        basePath: "https://localhost:7069"
      });
      const api = new LanguagesApi(config);

      // Викликаємо наш метод API для видалення мови
      await api.apiLanguagesIdDelete({ id: languageId });

      // Оновлюємо серверні дані на сторінці
      router.refresh();
    } catch (error) {
      console.error("Помилка при видаленні мови:", error);
      alert('Не вдалося видалити мову.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DeleteButton onClick={handleDelete}>
      {isDeleting ? 'Зачекайте...' : 'Видалити'}
    </DeleteButton>
  );
}
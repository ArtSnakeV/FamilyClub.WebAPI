"use client";

import { alertError } from "@/lib/ui/sweetAlert";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DeleteButton from "./delete_button"; // Твоя оригінальная кнопка видалення

// Описуємо універсальні пропси, де тип ID (T) може бути як числом, так і рядком
interface DeleteWithConfirmProps<T extends string | number> {
  id: T | undefined;
  onDelete: (id: T) => Promise<void>; // Очікує асинхронну функцію
  entityName: string;                 // Назва для виводу помилок ("продукт", "мову" тощо)
}

export default function DeleteWithConfirm<T extends string | number>({ 
  id, 
  onDelete,
  entityName 
}: DeleteWithConfirmProps<T>) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  // Автоматично скидаємо стан підтвердження через 4 секунди, якщо користувач передумав
  useEffect(() => {
    if (!isConfirming) return;
    
    const timer = setTimeout(() => {
      setIsConfirming(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isConfirming]);

  const handleDeleteClick = async () => {
    if (id === undefined) return;

    try {
      setIsDeleting(true);
      
      // Викликаємо функцію, яку передав батьківський компонент ItemActions
      await onDelete(id); 
      
      // Свіжа практика Next.js: повідомляємо серверу, що треба оновити дані в списках
      router.refresh(); 
    } catch (error) {
      console.error(`Помилка видалення для сутності [${entityName}]:`, error);
      await alertError(`Не вдалося видалити ${entityName}. Спробуйте ще раз.`);
    } finally {
      setIsDeleting(false);
      setIsConfirming(false);
    }
  };

  // Режим підтвердження: показуємо дві стилізовані кнопки "Видалити" та "Ні"
  if (isConfirming) {
    return (
      <div className="flex items-center gap-[10px] animate-fade-in">
        <button
          type="button"
          disabled={isDeleting}
          onClick={handleDeleteClick}
          className="w-[110px] h-[30px] bg-[var(--color-black)] text-white rounded-[9px] px-[15px] flex items-center justify-center font-medium text-sm transition-all duration-200 hover:opacity-90 hover:shadow-[0px_0px_20px_0px_#00000080]  disabled:opacity-50"
        >
          <span>{isDeleting ? "..." : "Видалити"}</span>
        </button>

        <button
          type="button"
          disabled={isDeleting}
          onClick={() => setIsConfirming(false)}
          className="w-[90px] h-[30px] bg-[var(--color-brown)] text-white rounded-[9px] px-[15px] flex items-center justify-center font-medium text-sm transition-all duration-200 hover:opacity-90 hover:shadow-[0px_0px_20px_0px_#00000080] disabled:opacity-50"
        >
          <span>Ні</span>
        </button>
      </div>
    );
  }

  // Початковий режим: звичайна кнопка видалення
  return (
    <DeleteButton onClick={() => setIsConfirming(true)}>
      Видалити
    </DeleteButton>
  );
}
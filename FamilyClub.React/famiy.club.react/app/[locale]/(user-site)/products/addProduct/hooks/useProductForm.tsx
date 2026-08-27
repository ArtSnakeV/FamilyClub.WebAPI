import { alertSuccess } from "@/lib/ui/sweetAlert";
import { useState, useEffect } from "react"; 
import { CoverType } from "@/lib/api/generated";
import { ProductDto } from "@/app/(user-site)/products/addProduct/types";

// Початковий стан форми (дефолтні значення)
const initialDto: ProductDto = {
  productName: "",
  description: "",
  pageCount: undefined,
  itemsInSet: 1,
  categoryIds: [],
  languageId: undefined,
  coverType: CoverType.NUMBER_0,
  availability: undefined,
  leaveOldImages: false,
  quantityInStock: undefined,
  bookSizeIds: [],
  publisherId: undefined,
  authorIds: [],
  formatIds: [],
  ageRestrictionIds: [],
  price: undefined,
  discountPrice: undefined,
  promotionId: undefined,
  isbn: undefined,
  publishingYear: undefined,
};

const DRAFT_KEY = "productDraft";

export function useProductForm() {
  // Ініціалізуємо стейт чистим дефолтним об'єктом.
  // Під час збірки проєкту (SSR) Next.js візьме саме ці значення, не чіпаючи localStorage.
  const [form, setForm] = useState<ProductDto>(initialDto);

  // Цей хук спрацює ТІЛЬКИ в браузері користувача після того, як сторінка успішно завантажиться.
  // Оскільки порожній масив залежностей [] означає виконання один раз при монтуванні,
  // ми безпечно дістаємо дані з localStorage, коли об'єкт window вже точно існує.
  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        // Якщо чернетка є, оновлюємо наш стейт збереженими даними
        setForm(JSON.parse(saved));
      } catch (e) {
        console.error("Помилка парсингу чернетки:", e);
      }
    }
  }, []);

  // Функція для оновлення конкретного поля у формі
  const setField = <K extends keyof ProductDto>(key: K, value: ProductDto[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Збереження чернетки (викликається користувачем через клік, тому тут localStorage безпечний)
  const saveDraft = async () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    await alertSuccess("Чернетку збережено");
  };

  // Очищення чернетки та скидання форми до початкового стану
  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setForm(initialDto);
  };

  // Додавання/видалення категорій (чекбокси)
  const toggleCategory = (id: number) =>
    setField(
      "categoryIds",
      form.categoryIds.includes(id)
        ? form.categoryIds.filter((c) => c !== id)
        : [...form.categoryIds, id],
    );

  return { form, setField, toggleCategory, saveDraft, clearDraft };
}
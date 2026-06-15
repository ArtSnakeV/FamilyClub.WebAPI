"use client";

import Link from "next/link";
import AddEditButton from "./add_edit_button"; 
import DeleteWithConfirm from "./delete_with_confirm"; 

// Імпортуємо саме з services.ts
import { productService, languageService, authorService, translatorService, categoriesService, publisherService } from "@/lib/api/services"; 

type EntityType = "product" | "language" | "author" | "translator" | "category" | "publisher";

interface ItemActionsProps {
  id: number | undefined;
  type: EntityType;
}

export default function ItemActions({ id, type }: ItemActionsProps) {
  
  // 1. Карта шляхів для редагування
  const editPaths: Record<EntityType, string> = {
    product: `/products/editProduct/${id}`,
    language: `/languages/edit/${id}`,
    author: `/authors/edit/${id}`,
    translator: `/translators/edit/${id}`,
    category: `/books/categories/edit/${id}`,
    publisher: `/books/publishers/edit/${id}`,
  };

  // 2. Карта назв для повідомлень
  const entityLabels: Record<EntityType, string> = {
    product: "продукт",
    language: "мову",
    author: "автора",
    translator: "перекладача",
    category: "категорію",
    publisher: "видавництво",
  };

  // 3. Функція видалення, яка викликає відповідний готовий сервіс
  const handleDeleteApiCall = async (currentId: number) => {
    switch (type) {
      case "product":
        // Викликаємо метод із готового об'єкта productService
        await productService.apiProductsIdDelete({ id: currentId });
        break;
      case "language":
        // Викликаємо метод із готового об'єкта languageService
        await languageService.apiLanguagesIdDelete({ id: currentId });
        break;
      case "author":
        await authorService.apiAuthorsIdDelete({ id: currentId });
        break;
      case "translator":
        await translatorService.apiTranslatorsIdDelete({ id: currentId });
        break;
      case "category":
        await categoriesService.apiCategoriesIdDelete({ id: currentId });
        break;
      case "publisher":
        await publisherService.apiPublishersIdDelete({ id: currentId });
        break;
      default:
        console.error("Невідомий тип сутності для видалення");
    }
  };

  return (
    <div className="flex items-center gap-[20px]">
      <Link href={editPaths[type]}>
        <AddEditButton>Редагувати</AddEditButton>
      </Link>
      
      <DeleteWithConfirm 
        id={id} 
        entityName={entityLabels[type]}
        onDelete={handleDeleteApiCall} 
      />
    </div>
  );
}
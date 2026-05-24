"use client";

import { useEffect, useState } from "react";
import { categoriesService } from "@/lib/api/services";
import type { CategoryDto } from "@/lib/api/generated/models/CategoryDto";


export default function CategoryPage({ params }: { params: { id: string } }) {
  const [category, setCategory] = useState<CategoryDto | null>(null);

  useEffect(() => {
    let isMounted = true;
    const categoryId = Number(params.id);

    if (!Number.isFinite(categoryId)) {
      return;
    }

    const loadCategory = async () => {
      try {
        const result = await categoriesService.apiCategoriesIdGet({ id: categoryId });
        if (isMounted) {
          setCategory(result);
        }
      } catch (error) {
        console.error("Failed to load category:", error);
      }
    };

    loadCategory();

    return () => {
      isMounted = false;
    };
  }, [params.id]);

  return (
    <div>
      <p className="mt-4 text-gray-700">
        {category?.categoryName || "No description provided for this club category."}
      </p>
      
      {/* You could then fetch products filtered by this category here */}
    </div>
  );
}
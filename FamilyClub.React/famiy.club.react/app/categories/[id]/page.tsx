import { categoriesService } from "@/lib/api/services";

export default async function CategoryPage({ params }: { params: { id: string } }) {
  // params.id comes from the URL
  const categoryId = parseInt(params.id);

  // 3. Call the specific "Get by ID" controller method
  const category = await categoriesService.apiCategoriesIdGet({ id: categoryId });

  return (
    <div>
      <p className="mt-4 text-gray-700">
        {category.categoryName || "No description provided for this club category."}
      </p>
      
      {/* You could then fetch products filtered by this category here */}
    </div>
  );
}
import { categoriesService } from "@/lib/api/services";


export async function generateStaticParams() {
  try {
    // Call your service to get all categories
    const categories = await categoriesService.apiCategoriesGet();

    // Map them to the required format: [{ id: '1' }, { id: '2' }]
    return categories.map((category: any) => ({
      id: category.id.toString(), // Must be a string for the file system
    }));
  } catch (error) {
    console.error("Failed to generate static params for Categories:", error);
    // Return empty array so the build doesn't crash if the API is down
    return [];
  }
}

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
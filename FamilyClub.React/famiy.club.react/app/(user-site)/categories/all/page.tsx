import { categoriesService } from "@/lib/api/services";

export default async function AllCategoriesPage() {
  // Fetch the array of categories
  const categories = await categoriesService.apiCategoriesGet();

  return (
    // Using semantic colors from our theme and applying our custom fonts (Використовуємо семантичні кольори з нашої теми та застосовуємо наші кастомні шрифти)
    <div className="p-4 bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="text-2xl font-bold mb-4 text-brand-brown">All Categories</h1>
      
      <div className="grid gap-4">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="p-4 border border-brand-black/10 rounded shadow-sm bg-white"
          >
            {/* Using our custom accent color (Використовуємо наш кастомний акцентний колір) */}
            <h2 className="text-lg font-semibold text-primary-action">
                {category.categoryName || "Unnamed Category"}
            </h2>
            
            
            <p className="text-brand-black opacity-70 font-mono text-sm">
                ID: {category.id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
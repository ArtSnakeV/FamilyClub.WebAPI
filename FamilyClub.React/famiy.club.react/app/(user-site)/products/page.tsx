import { productService } from "@/lib/api/services";
import CatalogClient from "./CatalogClient";

export default async function CatalogPage() {
  try {
    const products = await productService.apiProductsGet();
    
    return <CatalogClient initialProducts={products} />;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Помилка при завантаженні каталогу</h1>
          <p className="text-gray-600">Не вдалося завантажити товари. Спробуйте пізніше.</p>
        </div>
      </div>
    );
  }
}

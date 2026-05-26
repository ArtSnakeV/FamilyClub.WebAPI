"use client"; // Required for forms and useState
import { categoriesService } from "@/lib/api/services";
import { useRouter } from "next/navigation";

export default function NewCategoryPage() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      // 4. Use the POST method from your generated code
      await categoriesService.apiCategoriesPost({
        categoryDto: {
          categoryName: formData.get("categoryName") as string
        }
      });
      
      router.push("/"); // Go back home
      router.refresh(); // Refresh footer to show new category in nav
    } catch (error) {
      alert("Failed to create category!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input name="name" placeholder="Category Name" className="border p-2 w-full" required />
      <textarea name="description" placeholder="Description" className="border p-2 w-full" />
      <button type="submit" className="bg-green-500 text-white p-2 px-4 rounded">
        Save Category
      </button>
    </form>
  );
}
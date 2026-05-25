import type { CategoryDto } from "@/lib/api/generated/models/CategoryDto";
import CategoryClient from "./categoryClient";

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`
  );

  const categories: CategoryDto[] = await res.json();

  return categories.map((c) => ({
    id: String(c.id),
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <CategoryClient id={params.id} />;
}
import { redirect } from "next/navigation";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const queryString = new URLSearchParams(
    Object.entries(params || {}).reduce((acc, [key, val]) => {
      if (typeof val === "string") acc[key] = val;
      else if (Array.isArray(val)) acc[key] = val.join(",");
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  redirect(`/products${queryString ? `?${queryString}` : ""}`);
}

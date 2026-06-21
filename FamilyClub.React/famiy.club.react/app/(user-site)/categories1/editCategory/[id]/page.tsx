import EditCategoryClient from "./EditCategoryClient";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditCategoryClient id={id} />;
}
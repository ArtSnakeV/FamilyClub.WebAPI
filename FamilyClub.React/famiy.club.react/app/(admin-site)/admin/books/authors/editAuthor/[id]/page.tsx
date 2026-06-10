import EditAuthorClient from "./EditAuthorClient";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditAuthorClient id={id} />;
}
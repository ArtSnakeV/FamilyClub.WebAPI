import EditBookSizeClient from "./EditBookSizeClient";

export default async function EditBookSizePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditBookSizeClient id={id} />;
}

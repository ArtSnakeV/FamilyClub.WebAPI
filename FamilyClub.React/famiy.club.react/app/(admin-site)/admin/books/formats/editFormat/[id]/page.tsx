import EditFormatClient from "./EditFormatClient";

export default async function EditFormatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditFormatClient id={id} />;
}

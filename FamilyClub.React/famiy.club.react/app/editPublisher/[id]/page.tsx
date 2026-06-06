import EditPublisherClient from "./EditPublisherClient";

export default async function EditPublisherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditPublisherClient id={id} />;
}
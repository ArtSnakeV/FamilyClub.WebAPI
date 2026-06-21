import EditTranslatorClient from "./EditTranslatorClient";

export default async function EditTranslatorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditTranslatorClient id={id} />;
}
import EditLanguageClient from "./EditLanguageClient";

export default async function EditLanguagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditLanguageClient id={id} />;
}
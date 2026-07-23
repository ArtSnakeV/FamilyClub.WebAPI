import EditRoleClient from "./EditRoleClient";

export default async function EditRolePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <EditRoleClient id={id} />;
}

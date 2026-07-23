"use client";

import Link from "next/link";
import AddEditButton from "@/app/(admin-site)/common_elements/add_edit_button";
import DeleteWithConfirm from "@/app/(admin-site)/common_elements/delete_with_confirm";
import { deleteRole, isProtectedRole } from "../api/roleApi";

interface Props {
    id: string;
    name: string;
    onDeleteSuccess?: (id: string) => void;
}

export default function ItemActionsRole({ id, name, onDeleteSuccess }: Props) {
    const protectedRole = isProtectedRole(name);

    const handleDelete = async (currentId: string) => {
        if (isProtectedRole(name)) {
            throw new Error("Системну роль не можна видалити");
        }
        await deleteRole(currentId);
        onDeleteSuccess?.(currentId);
    };

    return (
        <div className="flex items-center gap-[20px]">
            <Link href={`/admin/roles/role-actions/editRole/${id}`}>
                <AddEditButton>Редагувати</AddEditButton>
            </Link>

            {protectedRole ? (
                <span
                    className="text-[12px] text-[#6B6B6B] whitespace-nowrap"
                    title="Системну роль не можна видалити"
                >
                    Захищена
                </span>
            ) : (
                <DeleteWithConfirm
                    id={id}
                    entityName="роль"
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}

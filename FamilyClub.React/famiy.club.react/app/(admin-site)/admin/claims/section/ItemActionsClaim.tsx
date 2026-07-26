"use client";

import Link from "next/link";
import AddEditButton from "@/app/(admin-site)/common_elements/add_edit_button";
import DeleteWithConfirm from "@/app/(admin-site)/common_elements/delete_with_confirm";
import { ClaimWithMemberDto, claimRowKey, deleteClaim } from "../api/claimsApi";

interface Props {
    claim: ClaimWithMemberDto;
    onDeleteSuccess?: (key: string) => void;
}

export default function ItemActionsClaim({ claim, onDeleteSuccess }: Props) {
    const editHref =
        `/admin/claims/editClaim?memberId=${encodeURIComponent(claim.memberId)}` +
        `&claimType=${encodeURIComponent(claim.claimType)}` +
        `&claimValue=${encodeURIComponent(claim.claimValue)}`;

    const handleDelete = async () => {
        await deleteClaim(claim.memberId, claim.claimType, claim.claimValue);
        onDeleteSuccess?.(claimRowKey(claim));
    };

    return (
        <div className="flex items-center gap-[20px]">
            <Link href={editHref}>
                <AddEditButton>Редагувати</AddEditButton>
            </Link>

            <DeleteWithConfirm
                id={claimRowKey(claim)}
                entityName="claim"
                onDelete={handleDelete}
            />
        </div>
    );
}

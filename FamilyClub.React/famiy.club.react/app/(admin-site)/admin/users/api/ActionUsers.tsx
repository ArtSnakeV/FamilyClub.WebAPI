export async function lockUser(id: string) {
    const res = await fetch(`/api/ClubMember/${id}/lock`, {
        method: "PUT",
    });

    if (!res.ok) throw new Error("Failed to lock user");
}

export async function unlockUser(id: string) {
    const res = await fetch(`/api/ClubMember/${id}/unlock`, {
        method: "PUT",
    });

    if (!res.ok) throw new Error("Failed to unlock user");
}

export async function deleteUser(id: string) {
    const res = await fetch(`/api/ClubMember/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete user");
}
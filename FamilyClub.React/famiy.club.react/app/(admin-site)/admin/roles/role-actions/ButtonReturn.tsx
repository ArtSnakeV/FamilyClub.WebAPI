"use client";

import { useRouter } from "next/navigation";

export default function ButtonReturn() {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() => router.push("/admin/roles/role-actions")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/70 hover:bg-white transition"
            aria-label="Назад до списку ролей"
        >
            <img
                src="/images/blockedUsersPageAdmin/keyboard_backspace_24px.png"
                alt=""
                className="w-7 h-7 object-contain"
            />
        </button>
    );
}

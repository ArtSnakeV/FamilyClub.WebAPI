"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAccessControl } from "@/lib/auth/useAccessControl";
import { getFirstAllowedAdminPath } from "@/lib/auth/accessControl";

/**
 * Блокує розділи адмінки, до яких у ролей користувача немає права в матриці.
 */
export default function AdminAccessGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { loading, canPath, roles, user } = useAccessControl();

    useEffect(() => {
        if (loading) return;
        if (!pathname?.startsWith("/admin")) return;

        if (!user) {
            router.replace(`/login?returnUrl=${encodeURIComponent(pathname)}`);
            return;
        }

        if (!canPath(pathname)) {
            const fallback = getFirstAllowedAdminPath(roles);
            if (fallback !== pathname) {
                router.replace(fallback);
            }
        }
    }, [loading, pathname, canPath, roles, user, router]);

    if (loading) {
        return (
            <div className="p-10 text-[18px] text-[#2F2F2F]">
                Перевірка доступів...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-10 text-[18px] text-[#2F2F2F]">
                Потрібен вхід...
            </div>
        );
    }

    if (!canPath(pathname)) {
        return (
            <div className="p-10 text-[18px] text-[#2F2F2F]">
                Немає доступу до цього розділу. Перенаправлення...
            </div>
        );
    }

    return <>{children}</>;
}

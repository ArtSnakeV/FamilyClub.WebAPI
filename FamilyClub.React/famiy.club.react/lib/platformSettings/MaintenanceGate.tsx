"use client";

import { usePathname } from "next/navigation";
import { usePlatformSettings } from "@/lib/platformSettings/PlatformSettingsContext";

/** Blocks user-site content when maintenance mode is on (admin routes unaffected). */
export default function MaintenanceGate({
    children,
}: {
    children: React.ReactNode;
}) {
    const { settings, loading } = usePlatformSettings();
    const pathname = usePathname();

    // Allow auth pages during maintenance so admins can still log in via user site if needed
    const isAuth =
        pathname?.startsWith("/login") ||
        pathname?.startsWith("/register") ||
        pathname?.startsWith("/forgot-password") ||
        pathname?.startsWith("/resetpassword");

    if (loading || !settings.maintenanceMode || isAuth) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-6 py-16">
            <div className="max-w-lg rounded-[12px] bg-white px-8 py-10 text-center shadow-[0_0_20px_rgba(0,0,0,0.12)]">
                <h1 className="text-2xl font-bold text-[#1F1F1F] mb-3">
                    {settings.companyName || "Сайт тимчасово недоступний"}
                </h1>
                <p className="text-[15px] text-[#555] whitespace-pre-wrap break-words">
                    {settings.maintenanceMessage}
                </p>
            </div>
        </div>
    );
}

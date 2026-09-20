"use client";

import { PlatformSettingsProvider } from "@/lib/platformSettings/PlatformSettingsContext";
import PlatformSettingsEffects from "@/lib/platformSettings/PlatformSettingsEffects";
import MaintenanceGate from "@/lib/platformSettings/MaintenanceGate";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";

export default function UserSiteProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider>
            <PlatformSettingsProvider>
                <PlatformSettingsEffects />
                <MaintenanceGate>{children}</MaintenanceGate>
            </PlatformSettingsProvider>
        </ThemeProvider>
    );
}

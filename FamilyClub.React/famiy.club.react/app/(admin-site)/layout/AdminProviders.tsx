"use client";

import { PlatformSettingsProvider } from "@/lib/platformSettings/PlatformSettingsContext";
import PlatformSettingsEffects from "@/lib/platformSettings/PlatformSettingsEffects";

export default function AdminProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <PlatformSettingsProvider>
            <PlatformSettingsEffects />
            {children}
        </PlatformSettingsProvider>
    );
}

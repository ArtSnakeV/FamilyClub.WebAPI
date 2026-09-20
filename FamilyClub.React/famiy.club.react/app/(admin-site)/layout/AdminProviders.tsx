"use client";

import { PlatformSettingsProvider } from "@/lib/platformSettings/PlatformSettingsContext";
import PlatformSettingsEffects from "@/lib/platformSettings/PlatformSettingsEffects";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import type { Dictionary } from "@/lib/i18n/types";
import ukDictionary from "@/messages/uk.json";

export default function AdminProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LocaleProvider
            locale="uk"
            dictionary={ukDictionary as Dictionary}
        >
            <ThemeProvider>
                <PlatformSettingsProvider>
                    <PlatformSettingsEffects />
                    {children}
                </PlatformSettingsProvider>
            </ThemeProvider>
        </LocaleProvider>
    );
}

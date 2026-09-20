"use client";

import { usePlatformSettingsOptional } from "@/lib/platformSettings/PlatformSettingsContext";

/** Contact strip from platform basic info — used on Complaints pages. */
export default function PlatformContactStrip() {
    const { settings, loading } = usePlatformSettingsOptional();

    if (loading) return null;

    const parts = [
        settings.companyName,
        settings.supportEmail,
        settings.supportPhone,
        settings.companyAddress,
    ].filter(Boolean);

    if (parts.length === 0) return null;

    return (
        <div className="rounded-[12px] bg-[var(--background-elevated)] px-5 py-3 shadow-[var(--shadow-card)] text-[13px] text-[var(--foreground-primary)] border border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)]">
            <p className="font-semibold text-[var(--foreground-primary)]">
                {settings.companyName}
                {settings.slogan ? (
                    <span className="font-normal text-[var(--color-muted-fg)]">
                        {" "}
                        — {settings.slogan}
                    </span>
                ) : null}
            </p>
            <p className="mt-1 text-[var(--color-muted-fg)] break-words">
                {[
                    settings.supportEmail,
                    settings.supportPhone,
                    settings.companyAddress,
                ]
                    .filter(Boolean)
                    .join(" · ")}
            </p>
        </div>
    );
}

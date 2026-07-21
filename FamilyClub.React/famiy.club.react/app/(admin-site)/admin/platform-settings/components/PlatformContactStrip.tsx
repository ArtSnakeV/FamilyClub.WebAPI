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
        <div className="rounded-[12px] bg-white/90 px-5 py-3 shadow-[0_0_10px_rgba(0,0,0,0.08)] text-[13px] text-[#2F2F2F]">
            <p className="font-semibold text-[#1F1F1F]">
                {settings.companyName}
                {settings.slogan ? (
                    <span className="font-normal text-[#777]">
                        {" "}
                        — {settings.slogan}
                    </span>
                ) : null}
            </p>
            <p className="mt-1 text-[#555] break-words">
                {[settings.supportEmail, settings.supportPhone, settings.companyAddress]
                    .filter(Boolean)
                    .join(" · ")}
            </p>
        </div>
    );
}

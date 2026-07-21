"use client";

import { useEffect } from "react";
import { usePlatformSettings } from "@/lib/platformSettings/PlatformSettingsContext";
import { mediaSrc } from "@/lib/platformSettings/platformSettingsApi";

/** Applies favicon from platform settings. */
export default function PlatformSettingsEffects() {
    const { settings } = usePlatformSettings();

    useEffect(() => {
        const href = mediaSrc(settings.iconData, settings.iconContentType);
        if (!href) return;

        let link = document.querySelector(
            "link[rel='icon']"
        ) as HTMLLinkElement | null;
        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
        }
        link.href = href;
    }, [settings.iconData, settings.iconContentType]);

    return null;
}

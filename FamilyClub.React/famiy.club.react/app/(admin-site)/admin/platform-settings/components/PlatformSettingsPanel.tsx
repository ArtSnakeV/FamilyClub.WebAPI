"use client";

import { usePlatformSettings } from "@/lib/platformSettings/PlatformSettingsContext";
import type { PlatformSettings } from "@/lib/platformSettings/platformSettingsApi";
import {
    BasicInfoSection,
    BookSettingsSection,
    BrandingMaintenanceSection,
} from "./SettingsSections";

export default function PlatformSettingsPanel() {
    const { settings, loading, save } = usePlatformSettings();

    const handleSave = async (next: PlatformSettings) => {
        await save(next);
    };

    if (loading) {
        return (
            <p className="text-[16px] text-[#6B6B6B]">
                Завантаження налаштувань...
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold text-[#1F1F1F]">
                    Налаштування платформи
                </h1>
                <p className="text-[14px] text-[#6B6B6B] mt-1">
                    Основна інформація, книжкові параметри, брендинг і режим
                    обслуговування
                </p>
            </div>

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <BasicInfoSection settings={settings} onSave={handleSave} />
                <BookSettingsSection settings={settings} onSave={handleSave} />
            </section>

            <BrandingMaintenanceSection
                settings={settings}
                onSave={handleSave}
            />
        </div>
    );
}

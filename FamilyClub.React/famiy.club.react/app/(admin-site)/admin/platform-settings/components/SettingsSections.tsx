"use client";

import { useEffect, useState } from "react";
import type { PlatformSettings } from "@/lib/platformSettings/platformSettingsApi";
import { mediaSrc, readFileAsDataUrl } from "@/lib/platformSettings/platformSettingsApi";
import SettingsCard, {
    SettingsField,
    settingsInputClass,
} from "./SettingsCard";
import SettingsToggle from "./SettingsToggle";
import UploadDropzone from "./UploadDropzone";

type SectionProps = {
    settings: PlatformSettings;
    onSave: (next: PlatformSettings) => Promise<void>;
};

export function BasicInfoSection({ settings, onSave }: SectionProps) {
    const [draft, setDraft] = useState(settings);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        setDraft(settings);
    }, [settings]);

    const set = <K extends keyof PlatformSettings>(key: K, value: PlatformSettings[K]) =>
        setDraft((d) => ({ ...d, [key]: value }));

    return (
        <SettingsCard
            title="Основна інформація"
            saving={saving}
            onCancel={() => {
                setDraft(settings);
                setMessage(null);
            }}
            onSave={async () => {
                setSaving(true);
                setMessage(null);
                try {
                    await onSave(draft);
                    setMessage("Збережено");
                } catch {
                    setMessage("Помилка збереження");
                } finally {
                    setSaving(false);
                }
            }}
        >
            <SettingsField label="Назва компанії">
                <input
                    className={settingsInputClass}
                    value={draft.companyName}
                    onChange={(e) => set("companyName", e.target.value)}
                    placeholder="Введіть назву компанії..."
                />
            </SettingsField>
            <SettingsField label="Слоган">
                <input
                    className={settingsInputClass}
                    value={draft.slogan ?? ""}
                    onChange={(e) => set("slogan", e.target.value)}
                    placeholder="Введіть слоган компанії..."
                />
            </SettingsField>
            <SettingsField label="Email підтримки">
                <input
                    type="email"
                    className={settingsInputClass}
                    value={draft.supportEmail ?? ""}
                    onChange={(e) => set("supportEmail", e.target.value)}
                    placeholder="Введіть email підтримки..."
                />
            </SettingsField>
            <SettingsField label="Телефон підтримки">
                <input
                    className={settingsInputClass}
                    value={draft.supportPhone ?? ""}
                    onChange={(e) => set("supportPhone", e.target.value)}
                    placeholder="Введіть номер підтримки..."
                />
            </SettingsField>
            <SettingsField label="Адреса компанії">
                <input
                    className={settingsInputClass}
                    value={draft.companyAddress ?? ""}
                    onChange={(e) => set("companyAddress", e.target.value)}
                    placeholder="Введіть адресу компанії..."
                />
            </SettingsField>
            {message && (
                <p className="text-[13px] text-[#005b33]">{message}</p>
            )}
        </SettingsCard>
    );
}

const RESIZE_OPTIONS = [
    { value: "1920", label: "До 1920px по більшій стороні" },
    { value: "1280", label: "До 1280px по більшій стороні" },
    { value: "1024", label: "До 1024px по більшій стороні" },
    { value: "off", label: "Без зменшення" },
];

export function BookSettingsSection({ settings, onSave }: SectionProps) {
    const [draft, setDraft] = useState(settings);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        setDraft(settings);
    }, [settings]);

    const set = <K extends keyof PlatformSettings>(key: K, value: PlatformSettings[K]) =>
        setDraft((d) => ({ ...d, [key]: value }));

    return (
        <SettingsCard
            title="Книжкові налаштування"
            saving={saving}
            onCancel={() => {
                setDraft(settings);
                setMessage(null);
            }}
            onSave={async () => {
                setSaving(true);
                setMessage(null);
                try {
                    await onSave(draft);
                    setMessage("Збережено");
                } catch {
                    setMessage("Помилка збереження");
                } finally {
                    setSaving(false);
                }
            }}
        >
            <SettingsField label="Кількість книг на сторінці">
                <input
                    type="number"
                    min={1}
                    className={settingsInputClass}
                    value={draft.booksPerPage}
                    onChange={(e) =>
                        set("booksPerPage", Number(e.target.value) || 1)
                    }
                    placeholder="Введіть кількість книг на сторінці..."
                />
            </SettingsField>
            <SettingsField label="Максимальний розмір файлу (МБ)">
                <input
                    type="number"
                    min={1}
                    className={settingsInputClass}
                    value={draft.maxFileSizeMb}
                    onChange={(e) =>
                        set("maxFileSizeMb", Number(e.target.value) || 1)
                    }
                    placeholder="Введіть максимально допустимий розмір файлу в МБ..."
                />
            </SettingsField>
            <SettingsField label="Дозволені формати файлів">
                <input
                    className={settingsInputClass}
                    value={draft.allowedFileFormats}
                    onChange={(e) => set("allowedFileFormats", e.target.value)}
                    placeholder="Введіть формати файлів..."
                />
            </SettingsField>
            <SettingsField label="Автоматичне зменшення зображення">
                <select
                    className={settingsInputClass}
                    value={draft.imageResizeMode}
                    onChange={(e) => set("imageResizeMode", e.target.value)}
                >
                    {RESIZE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            </SettingsField>
            {message && (
                <p className="text-[13px] text-[#005b33]">{message}</p>
            )}
        </SettingsCard>
    );
}

export function BrandingMaintenanceSection({ settings, onSave }: SectionProps) {
    const [draft, setDraft] = useState(settings);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        setDraft(settings);
    }, [settings]);

    const handleFile = async (
        file: File,
        kind: "logo" | "icon" | "banner"
    ) => {
        const dataUrl = await readFileAsDataUrl(file);
        setDraft((d) => {
            if (kind === "logo") {
                return {
                    ...d,
                    logoData: dataUrl,
                    logoContentType: file.type || "image/png",
                };
            }
            if (kind === "icon") {
                return {
                    ...d,
                    iconData: dataUrl,
                    iconContentType: file.type || "image/png",
                };
            }
            return {
                ...d,
                bannerData: dataUrl,
                bannerContentType: file.type || "image/jpeg",
            };
        });
    };

    return (
        <SettingsCard
            title="Логотип, іконка, банер і режим обслуговування"
            saving={saving}
            onSave={async () => {
                setSaving(true);
                setMessage(null);
                try {
                    await onSave(draft);
                    setMessage("Збережено");
                } catch (e) {
                    const detail =
                        e instanceof Error ? e.message : "Помилка збереження";
                    setMessage(
                        detail.includes("401") || detail.includes("403")
                            ? "Немає доступу (увійдіть знову як Admin)"
                            : "Помилка збереження"
                    );
                } finally {
                    setSaving(false);
                }
            }}
        >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="flex flex-col gap-5">
                    <UploadDropzone
                        hint="PNG або SVG. Рекомендований розмір: 400×100"
                        buttonLabel="Завантажити логотип"
                        accept="image/png,image/svg+xml,.png,.svg"
                        previewSrc={mediaSrc(draft.logoData, draft.logoContentType)}
                        onFile={(f) => void handleFile(f, "logo")}
                        aspectClass="min-h-[140px]"
                    />
                    <UploadDropzone
                        hint="PNG або ICO. Рекомендований розмір: 512×512"
                        buttonLabel="Змінити іконку"
                        accept="image/png,image/x-icon,.png,.ico"
                        previewSrc={mediaSrc(draft.iconData, draft.iconContentType)}
                        onFile={(f) => void handleFile(f, "icon")}
                        aspectClass="min-h-[160px] max-w-[220px]"
                    />
                </div>

                <div className="flex flex-col gap-5">
                    <UploadDropzone
                        hint="Банер головної сторінки"
                        buttonLabel="Змінити банер головної сторінки"
                        accept="image/*"
                        previewSrc={mediaSrc(
                            draft.bannerData,
                            draft.bannerContentType
                        )}
                        onFile={(f) => void handleFile(f, "banner")}
                        aspectClass="min-h-[180px]"
                    />

                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <p className="text-[14px] font-semibold text-[#1F1F1F]">
                                Режим обслуговування
                            </p>
                            <p className="text-[12px] text-[#777] mt-1 break-words">
                                Увімкніть режим обслуговування, щоб тимчасово
                                закрити доступ до сайту для користувачів.
                            </p>
                        </div>
                        <SettingsToggle
                            checked={draft.maintenanceMode}
                            onChange={(v) =>
                                setDraft((d) => ({ ...d, maintenanceMode: v }))
                            }
                            label="Режим обслуговування"
                        />
                    </div>

                    <label className="flex flex-col gap-1.5">
                        <span className="text-[14px] font-semibold text-[#1F1F1F]">
                            Повідомлення для користувачів
                        </span>
                        <textarea
                            className={`${settingsInputClass} min-h-[110px] resize-y`}
                            maxLength={2000}
                            value={draft.maintenanceMessage}
                            onChange={(e) =>
                                setDraft((d) => ({
                                    ...d,
                                    maintenanceMessage: e.target.value,
                                }))
                            }
                            placeholder="Ми проводимо технічні роботи. Скоро сервіс знову запрацює!"
                        />
                        <span className="text-[12px] text-[#888]">
                            {draft.maintenanceMessage.length}/2000 символів
                        </span>
                    </label>
                </div>
            </div>
            {message && (
                <p
                    className={`text-[13px] ${
                        message === "Збережено"
                            ? "text-[#005b33]"
                            : "text-[#B42318]"
                    }`}
                >
                    {message}
                </p>
            )}
        </SettingsCard>
    );
}

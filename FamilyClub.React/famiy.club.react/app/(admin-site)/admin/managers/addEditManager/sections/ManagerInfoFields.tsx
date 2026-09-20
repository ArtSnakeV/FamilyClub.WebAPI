"use client";

import Image from "next/image";
import type { ManagerFormState } from "../hooks/useAddManagerForm";
import { managerFieldClass } from "../ui/fieldClass";
import UserSearchBlock from "./UserSearchBlock";

interface ManagerInfoFieldsProps {
    form: ManagerFormState;
    updateField: <K extends keyof ManagerFormState>(
        key: K,
        value: ManagerFormState[K]
    ) => void;
    disabled: boolean;
    emailDisabled?: boolean;
    searchEmail: string;
    setSearchEmail: (value: string) => void;
    searching: boolean;
    userFound: boolean;
    handleSearch: () => void;
    roleOptions?: Array<{ value: string; label: string }>;
}

function toDateInputValue(date: Date | null): string {
    if (!date) return "";
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

export default function ManagerInfoFields({
    form,
    updateField,
    disabled,
    emailDisabled,
    searchEmail,
    setSearchEmail,
    searching,
    userFound,
    handleSearch,
    roleOptions = [
        { value: "Manager", label: "Менеджер" },
        { value: "Admin", label: "Адмін" },
        { value: "User", label: "Користувач" },
    ],
}: ManagerInfoFieldsProps) {
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(",")[1] ?? "";
            updateField("avatarData", base64);
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <div className="flex flex-row gap-3 items-center justify-between">
                <div className="flex flex-1 gap-1 w-full mt-[13vh]">
                    <UserSearchBlock
                        searchEmail={searchEmail}
                        onSearchEmailChange={setSearchEmail}
                        searching={searching}
                        userFound={userFound}
                        onSearch={handleSearch}
                    />
                </div>
                <div className="flex flex-1 flex-col items-center gap-4">
                    {form.avatarData ? (
                        <img
                            src={`data:image/jpeg;base64,${form.avatarData}`}
                            alt="Avatar preview"
                            className="w-30 h-30 rounded-full object-cover mb-2"
                        />
                    ) : (
                        <div className="w-30 h-30 rounded-full bg-[var(--background-elevated)] text-[var(--foreground-primary)] flex items-center justify-center font-bold mb-2 border border-[color-mix(in_srgb,var(--foreground-primary)_18%,transparent)]">
                            {form.firstName?.[0] ?? ""}
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        disabled={disabled}
                        className={`${managerFieldClass} h-[50px] file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-green)] file:px-3 file:py-1 file:text-[var(--color-cream)]`}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm text-[var(--foreground-primary)]">
                    Ім&apos;я
                </label>
                <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder="Введіть ім'я..."
                    disabled={disabled}
                    className={managerFieldClass}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm text-[var(--foreground-primary)]">
                    Прізвище
                </label>
                <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="Введіть прізвище..."
                    disabled={disabled}
                    className={managerFieldClass}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm text-[var(--foreground-primary)]">
                    Email
                </label>
                <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="Введіть email..."
                    disabled={disabled || emailDisabled}
                    className={managerFieldClass}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm text-[var(--foreground-primary)]">
                    Телефон
                </label>
                <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="Введіть номер телефону..."
                    disabled={disabled}
                    className={managerFieldClass}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm text-[var(--foreground-primary)]">
                    Дата народження
                </label>
                <input
                    type="date"
                    value={toDateInputValue(form.dateOfBirth)}
                    onChange={(e) =>
                        updateField(
                            "dateOfBirth",
                            e.target.value ? new Date(e.target.value) : null
                        )
                    }
                    disabled={disabled}
                    className={managerFieldClass}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm text-[var(--foreground-primary)]">
                    Роль
                </label>
                <div className="relative">
                    <select
                        value={form.role}
                        onChange={(e) => updateField("role", e.target.value)}
                        disabled={disabled}
                        className={`${managerFieldClass} w-full appearance-none pr-10`}
                    >
                        {roleOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                        {!roleOptions.some((o) => o.value === form.role) &&
                            form.role && (
                                <option value={form.role}>{form.role}</option>
                            )}
                    </select>
                    <Image
                        src="/images/addManagerPageAdmin/angle-down-solid-full.png"
                        width={16}
                        height={16}
                        alt=""
                        className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-70"
                    />
                </div>
            </div>
        </>
    );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ButtonReturn from "../../ButtonReturn";
import { SectionCard } from "@/app/(admin-site)/admin/books/languages/addLanguage/ui/SectionCard";
import {
    fetchRoleById,
    isProtectedRole,
    updateRole,
} from "../../api/roleApi";

const fieldClass =
    "input rounded-[9px] px-3 bg-[var(--background-elevated)] text-[var(--foreground-primary)] shadow-[var(--shadow-input)] border border-[color-mix(in_srgb,var(--foreground-primary)_14%,transparent)] outline-none h-[44px]";

interface Props {
    id: string;
}

export default function EditRoleClient({ id }: Props) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [originalName, setOriginalName] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingRole, setLoadingRole] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRoleById(id)
            .then((role) => {
                setName(role.name);
                setOriginalName(role.name);
                setLoadingRole(false);
            })
            .catch((err) => {
                setError(err instanceof Error ? err.message : "Роль не знайдено");
                setLoadingRole(false);
            });
    }, [id]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await updateRole(id, name);
            router.push("/admin/roles/role-actions");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Помилка оновлення ролі");
        } finally {
            setLoading(false);
        }
    };

    if (loadingRole) {
        return (
            <div className="p-10 text-[20px] text-[var(--foreground-primary)]">
                Завантаження...
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col text-[var(--foreground-primary)]">
            <div
                className="relative w-[1200px] pb-[60px] -mt-[68px] mx-auto"
                style={{ height: "1200px" }}
            >
                <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none admin-parchment-bg bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/addProducts/Rectangle 312.svg')",
                        backgroundSize: "cover",
                        backgroundPosition: "top",
                    }}
                />
                <div className="relative z-10">
                    <div className="flex z-20 relative top-[130px] ml-[64px]">
                        <ButtonReturn />
                    </div>
                    <div className="flex flex-col items-center mt-[120px]">
                        <h1 className="text-[var(--foreground-primary)] w-[800px] font-['Roboto_Mono'] font-bold text-[64px] leading-[150%] tracking-[-0.011em] text-center">
                            Редагувати роль
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="w-full flex mt-[48px] gap-[4vw] justify-center">
                            <div className="w-[645px] flex flex-col">
                                <SectionCard
                                    title="Основна інформація"
                                    backgroundImage="/images/addProducts/Rectangle 314.png"
                                    className="bg-contain h-full"
                                    backgroundSize="100% 100%"
                                >
                                    <div className="flex w-[560px] flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[var(--foreground-primary)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
                                                Назва ролі *
                                            </p>
                                            <input
                                                placeholder="Назва ролі"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                className={fieldClass}
                                            />
                                            {isProtectedRole(originalName) && (
                                                <p className="text-[13px] text-[#981717] mt-1">
                                                    Це системна роль. Зміна назви може зламати доступ
                                                    до адмінки.
                                                </p>
                                            )}
                                        </div>

                                        {error && (
                                            <p className="text-[14px] text-[#981717]">{error}</p>
                                        )}

                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={loading || !name.trim()}
                                                className="w-full h-[60px] rounded-[55px] bg-[var(--color-green)] text-[var(--color-cream)] text-[20px] font-medium transition-all duration-200 hover:opacity-90 hover:shadow-[var(--shadow-panel)] active:scale-[0.98] disabled:opacity-50"
                                            >
                                                {loading ? "Збереження..." : "Зберегти зміни"}
                                            </button>
                                        </div>
                                    </div>
                                </SectionCard>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

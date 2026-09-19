"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonReturn from "../ButtonReturn";
import { SectionCard } from "@/app/(admin-site)/admin/books/languages/addLanguage/ui/SectionCard";
import { updateClaim } from "../api/claimsApi";

const fieldClass =
    "input rounded-[9px] px-3 bg-[var(--background-elevated)] text-[var(--foreground-primary)] shadow-[var(--shadow-input)] h-[44px] border border-[color-mix(in_srgb,var(--foreground-primary)_14%,transparent)] outline-none";

function EditClaimForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const memberId = searchParams.get("memberId") ?? "";
    const oldClaimType = searchParams.get("claimType") ?? "";
    const oldClaimValue = searchParams.get("claimValue") ?? "";

    const [claimType, setClaimType] = useState(oldClaimType);
    const [claimValue, setClaimValue] = useState(oldClaimValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!memberId || !oldClaimType || !oldClaimValue) {
            setError("Не вистачає параметрів claim для редагування");
            return;
        }
        setError(null);
        setLoading(true);
        try {
            await updateClaim(
                memberId,
                oldClaimType,
                oldClaimValue,
                claimType.trim(),
                claimValue.trim()
            );
            router.push("/admin/claims");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Помилка оновлення claim");
        } finally {
            setLoading(false);
        }
    };

    if (!memberId || !oldClaimType) {
        return (
            <div className="p-10 text-[18px] text-[#981717]">
                Некоректне посилання для редагування claim.
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col text-[var(--foreground-primary)]">
            <div className="relative w-[1200px] pb-[60px] -mt-[68px] mx-auto" style={{ height: "1200px" }}>
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
                            Редагувати claim
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="w-full flex mt-[48px] gap-[4vw] justify-center">
                            <div className="w-[645px] flex flex-col">
                                <SectionCard
                                    title="Claim користувача"
                                    backgroundImage="/images/addProducts/Rectangle 314.png"
                                    className="bg-contain h-full"
                                    backgroundSize="100% 100%"
                                >
                                    <div className="flex w-[560px] flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[var(--foreground-primary)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
                                                Member ID
                                            </p>
                                            <input
                                                value={memberId}
                                                disabled
                                                className={`${fieldClass} opacity-70`}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <p className="text-[var(--foreground-primary)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
                                                Claim type *
                                            </p>
                                            <input
                                                value={claimType}
                                                onChange={(e) => setClaimType(e.target.value)}
                                                required
                                                className={fieldClass}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <p className="text-[var(--foreground-primary)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
                                                Claim value *
                                            </p>
                                            <input
                                                value={claimValue}
                                                onChange={(e) => setClaimValue(e.target.value)}
                                                required
                                                className={fieldClass}
                                            />
                                        </div>

                                        {error && (
                                            <p className="text-[14px] text-[#981717]">
                                                {error}
                                            </p>
                                        )}

                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={
                                                    loading ||
                                                    !claimType.trim() ||
                                                    !claimValue.trim()
                                                }
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

export default function EditClaimPage() {
    return (
        <Suspense
            fallback={
                <div className="p-10 text-[20px] text-[var(--color-muted-fg)]">
                    Завантаження...
                </div>
            }
        >
            <EditClaimForm />
        </Suspense>
    );
}

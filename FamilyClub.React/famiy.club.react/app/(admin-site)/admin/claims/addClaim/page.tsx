"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ButtonReturn from "../ButtonReturn";
import { SectionCard } from "@/app/(admin-site)/admin/books/languages/addLanguage/ui/SectionCard";
import {
    addClaim,
    ClubMemberOption,
    fetchMembersForPicker,
} from "../api/claimsApi";

const fieldClass =
    "input rounded-[9px] px-3 bg-[var(--background-elevated)] text-[var(--foreground-primary)] shadow-[var(--shadow-input)] h-[44px] border border-[color-mix(in_srgb,var(--foreground-primary)_14%,transparent)] outline-none";

export default function AddClaimPage() {
    const router = useRouter();
    const [members, setMembers] = useState<ClubMemberOption[]>([]);
    const [memberId, setMemberId] = useState("");
    const [memberQuery, setMemberQuery] = useState("");
    const [claimType, setClaimType] = useState("");
    const [claimValue, setClaimValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingMembers, setLoadingMembers] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMembersForPicker()
            .then((data) => {
                setMembers(data);
                setLoadingMembers(false);
            })
            .catch((err) => {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Помилка завантаження користувачів"
                );
                setLoadingMembers(false);
            });
    }, []);

    const filteredMembers = useMemo(() => {
        const q = memberQuery.trim().toLowerCase();
        if (!q) return members.slice(0, 50);
        return members
            .filter((m) => {
                const hay = [m.id, m.email, m.phoneNumber, m.name, m.surname]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();
                return hay.includes(q);
            })
            .slice(0, 50);
    }, [members, memberQuery]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await addClaim(memberId, claimType.trim(), claimValue.trim());
            router.push("/admin/claims");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Помилка створення claim");
        } finally {
            setLoading(false);
        }
    };

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
                            Додати claim
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
                                                Користувач *
                                            </p>
                                            <input
                                                placeholder="Пошук: email, id, телефон, імʼя"
                                                value={memberQuery}
                                                onChange={(e) =>
                                                    setMemberQuery(e.target.value)
                                                }
                                                className={fieldClass}
                                            />
                                            <select
                                                value={memberId}
                                                onChange={(e) => setMemberId(e.target.value)}
                                                required
                                                disabled={loadingMembers}
                                                className={`${fieldClass} mt-2`}
                                            >
                                                <option value="">
                                                    {loadingMembers
                                                        ? "Завантаження..."
                                                        : "Оберіть користувача"}
                                                </option>
                                                {filteredMembers.map((m) => (
                                                    <option key={m.id} value={m.id}>
                                                        {m.email ?? m.id}
                                                        {m.phoneNumber
                                                            ? ` · ${m.phoneNumber}`
                                                            : ""}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <p className="text-[var(--foreground-primary)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
                                                Claim type *
                                            </p>
                                            <input
                                                placeholder="Наприклад: permission"
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
                                                placeholder="Наприклад: reviews"
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
                                                    !memberId ||
                                                    !claimType.trim() ||
                                                    !claimValue.trim()
                                                }
                                                className="w-full h-[60px] rounded-[55px] bg-[var(--color-green)] text-[var(--color-cream)] text-[20px] font-medium transition-all duration-200 hover:opacity-90 hover:shadow-[var(--shadow-panel)] active:scale-[0.98] disabled:opacity-50"
                                            >
                                                {loading ? "Збереження..." : "Додати claim"}
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

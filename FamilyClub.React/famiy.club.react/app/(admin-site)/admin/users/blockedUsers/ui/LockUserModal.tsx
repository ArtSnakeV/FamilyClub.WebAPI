"use client";

import { useState } from "react";
import useBlockReasons from "../hooks/useBlockReasons";
import { UserInfo } from "../../hooks/useAllUsersInfo";

interface Props {
    user: UserInfo;
    onConfirm: (
        blockReasonId: number,
        comment: string,
        lockoutEnd: string | null
    ) => void;
    onCancel: () => void;
}

const fieldClass =
    "w-full mt-1 border border-[color-mix(in_srgb,var(--foreground-primary)_18%,transparent)] rounded-lg px-3 py-2 bg-[var(--background-elevated)] text-[var(--foreground-primary)] outline-none focus:ring-2 focus:ring-[var(--color-green)]";

export default function LockUserModal({ user, onConfirm, onCancel }: Props) {
    const { blockReasons, loadingBlockReasons } = useBlockReasons();
    const [selectedReasonId, setSelectedReasonId] = useState<number | null>(
        null
    );
    const [blockType, setBlockType] = useState<"temporary" | "permanent">(
        "temporary"
    );
    const [days, setDays] = useState(7);
    const [comment, setComment] = useState("");

    const handleConfirm = () => {
        if (!selectedReasonId || !comment.trim()) return;

        const lockoutEnd =
            blockType === "permanent"
                ? null
                : new Date(
                      Date.now() + days * 24 * 60 * 60 * 1000
                  ).toISOString();

        onConfirm(selectedReasonId, comment.trim(), lockoutEnd);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[var(--background-elevated)] text-[var(--foreground-primary)] rounded-2xl p-6 w-[420px] max-w-full shadow-[var(--shadow-panel)] border border-[color-mix(in_srgb,var(--foreground-primary)_12%,transparent)]">
                <h2 className="text-lg font-semibold mb-1">
                    Заблокувати користувача
                </h2>
                <p className="text-sm text-[var(--color-muted-fg)] mb-4">
                    {user.name} {user.surname} ({user.email})
                </p>

                <label className="text-sm font-medium">Причина блокування</label>
                <select
                    className={`${fieldClass} mb-4`}
                    value={selectedReasonId ?? ""}
                    onChange={(e) => setSelectedReasonId(Number(e.target.value))}
                    disabled={loadingBlockReasons}
                >
                    <option value="" disabled>
                        {loadingBlockReasons
                            ? "Завантаження..."
                            : "Оберіть причину"}
                    </option>
                    {blockReasons.map((r) => (
                        <option key={r.id} value={r.id}>
                            {r.name}
                        </option>
                    ))}
                </select>

                <label className="text-sm font-medium">Тип блокування</label>
                <div className="flex gap-3 mt-1 mb-4">
                    <button
                        type="button"
                        onClick={() => setBlockType("temporary")}
                        className={`flex-1 py-2 rounded-lg text-sm cursor-pointer font-medium border transition ${
                            blockType === "temporary"
                                ? "bg-[var(--color-green)] text-[var(--color-cream)] border-[var(--color-green)]"
                                : "bg-transparent text-[var(--foreground-primary)] border-[color-mix(in_srgb,var(--foreground-primary)_28%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-green)_16%,var(--background-elevated))]"
                        }`}
                    >
                        Тимчасово
                    </button>
                    <button
                        type="button"
                        onClick={() => setBlockType("permanent")}
                        className={`flex-1 py-2 rounded-lg cursor-pointer text-sm font-medium border transition ${
                            blockType === "permanent"
                                ? "bg-[#981717] text-[var(--color-cream)] border-[#981717]"
                                : "bg-transparent text-[var(--foreground-primary)] border-[color-mix(in_srgb,var(--foreground-primary)_28%,transparent)] hover:bg-[color-mix(in_srgb,#981717_14%,var(--background-elevated))]"
                        }`}
                    >
                        Назавжди
                    </button>
                </div>

                {blockType === "temporary" && (
                    <div className="mb-4">
                        <label className="text-sm font-medium">
                            Кількість днів
                        </label>
                        <input
                            type="number"
                            min={1}
                            value={days}
                            onChange={(e) => setDays(Number(e.target.value))}
                            className={fieldClass}
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="text-sm font-medium">
                        Коментар{" "}
                        <span className="text-[var(--color-muted-fg)]">
                            (обов&apos;язково)
                        </span>
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) =>
                            setComment(e.target.value.slice(0, 500))
                        }
                        maxLength={500}
                        rows={4}
                        placeholder="Додайте коментар для клієнта..."
                        className={`${fieldClass} resize-none placeholder:text-[var(--color-muted-fg)]`}
                    />
                    <p className="text-xs text-[var(--color-muted-fg)] text-right mt-1">
                        {comment.length}/500
                    </p>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-2 cursor-pointer rounded-lg border border-[color-mix(in_srgb,var(--foreground-primary)_28%,transparent)] text-[var(--foreground-primary)] hover:bg-[color-mix(in_srgb,var(--foreground-primary)_8%,var(--background-elevated))] transition"
                    >
                        Скасувати
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={!selectedReasonId || !comment.trim()}
                        className="flex-1 py-2 rounded-lg cursor-pointer bg-[var(--color-green)] text-[var(--color-cream)] disabled:opacity-50 hover:opacity-90 transition"
                    >
                        Заблокувати
                    </button>
                </div>
            </div>
        </div>
    );
}

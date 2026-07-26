"use client";

import { useState } from "react";
import useBlockReasons from "../hooks/useBlockReasons";
import { UserInfo } from "../../hooks/useAllUsersInfo";

interface Props {
    user: UserInfo;
    onConfirm: (blockReasonId: number, comment: string, lockoutEnd: string | null) => void;
    onCancel: () => void;
}

export default function LockUserModal({ user, onConfirm, onCancel }: Props) {
    const { blockReasons, loadingBlockReasons } = useBlockReasons();
    const [selectedReasonId, setSelectedReasonId] = useState<number | null>(null);
    const [blockType, setBlockType] = useState<"temporary" | "permanent">("temporary");
    const [days, setDays] = useState(7);
    const [comment, setComment] = useState("");
    const handleConfirm = () => {
        if (!selectedReasonId || !comment.trim()) return;

        const lockoutEnd =
            blockType === "permanent"
                ? null
                : new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

        onConfirm(selectedReasonId, comment.trim(), lockoutEnd);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[420px] max-w-full">
                <h2 className="text-lg font-semibold mb-1">
                    Заблокувати користувача
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                    {user.name} {user.surname} ({user.email})
                </p>

                <label className="text-sm font-medium">Причина блокування</label>
                <select
                    className="w-full mt-1 mb-4 border rounded-lg px-3 py-2"
                    value={selectedReasonId ?? ""}
                    onChange={(e) => setSelectedReasonId(Number(e.target.value))}
                    disabled={loadingBlockReasons}
                >
                    <option value="" disabled>
                        {loadingBlockReasons ? "Завантаження..." : "Оберіть причину"}
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
                        className={`flex-1 py-2 rounded-lg text-sm cursor-pointer font-medium border ${blockType === "temporary"
                            ? "bg-[#1F5C3D] text-white border-[#1F5C3D]"
                            : "bg-white text-gray-700"
                            }`}
                    >
                        Тимчасово
                    </button>
                    <button
                        type="button"
                        onClick={() => setBlockType("permanent")}
                        className={`flex-1 py-2 rounded-lg cursor-pointer text-sm font-medium border ${blockType === "permanent"
                            ? "bg-[#981717] text-white border-[#981717]"
                            : "bg-white text-gray-700"
                            }`}
                    >
                        Назавжди
                    </button>
                </div>

                {blockType === "temporary" && (
                    <div className="mb-4">
                        <label className="text-sm font-medium">Кількість днів</label>
                        <input
                            type="number"
                            min={1}
                            value={days}
                            onChange={(e) => setDays(Number(e.target.value))}
                            className="w-full mt-1 border rounded-lg px-3 py-2"
                        />
                    </div>
                )}
                <div className="mb-4">
                    <label className="text-sm font-medium">
                        Коментар <span className="text-gray-400">(обов'язково)</span>
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value.slice(0, 500))}
                        maxLength={500}
                        rows={4}
                        placeholder="Додайте коментар для клієнта..."
                        className="w-full mt-1 border rounded-lg px-3 py-2 resize-none"
                    />
                    <p className="text-xs text-gray-400 text-right mt-1">{comment.length}/500</p>
                </div>
                <div className="flex gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-2 cursor-pointer rounded-lg border text-gray-700"
                    >
                        Скасувати
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={!selectedReasonId}
                        className="flex-1 py-2 rounded-lg cursor-pointer bg-[#1F5C3D] text-white disabled:opacity-50"
                    >
                        Заблокувати
                    </button>
                </div>
            </div>
        </div>
    );
}
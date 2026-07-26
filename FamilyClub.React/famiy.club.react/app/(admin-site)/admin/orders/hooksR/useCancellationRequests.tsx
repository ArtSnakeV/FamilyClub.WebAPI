"use client";

/**
 * ТИМЧАСОВИЙ FRONTEND-МОК.
 * Бекенд НЕ має сутності/полів для причини скасування/повернення чи рішення
 * менеджера — весь цей стан зберігається в localStorage і бачить його лише
 * той самий браузер. Обслуговує обидва типи запитів: "cancellation" і "return".
 */

import { useCallback, useState } from "react";

export type CancellationDecisionStatus = "pending" | "approved" | "rejected";
export type OrderRequestType = "cancellation" | "return";

export interface CancellationRequest {
    orderId: number;
    type: OrderRequestType;
    reason: string;
    managerComment: string;
    status: CancellationDecisionStatus;
    createdAt: string;
    decidedAt?: string;
}

const STORAGE_KEY = "familyclub_admin_cancellation_requests_mock";

const DEFAULT_REASON: Record<OrderRequestType, string> = {
    cancellation:
        "Причину скасування клієнт поки не залишає окремо — це демо-текст, поки на бекенді немає такого поля.",
    return:
        "Причину повернення клієнт поки не залишає окремо — це демо-текст, поки на бекенді немає такого поля.",
};

function loadAll(): Record<number, CancellationRequest> {
    if (typeof window === "undefined") return {};
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function saveAll(data: Record<number, CancellationRequest>) {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        // ігноруємо — це лише демо-стан
    }
}

export function useCancellationRequests() {
    const [requests, setRequests] = useState<Record<number, CancellationRequest>>(loadAll);

    const getRequest = useCallback(
        (orderId: number): CancellationRequest | null => requests[orderId] ?? null,
        [requests]
    );

    /** Менеджер натиснув «Скасувати замовлення» / «Оформити повернення» — відкриваємо запит на розгляд. */
    const createRequest = useCallback(
        (orderId: number, type: OrderRequestType = "cancellation") => {
            setRequests((prev) => {
                const next: Record<number, CancellationRequest> = {
                    ...prev,
                    [orderId]: {
                        orderId,
                        type,
                        reason: DEFAULT_REASON[type],
                        managerComment: "",
                        status: "pending",
                        createdAt: new Date().toISOString(),
                    },
                };
                saveAll(next);
                return next;
            });
        },
        []
    );

    const setComment = useCallback((orderId: number, comment: string) => {
        setRequests((prev) => {
            const existing = prev[orderId];
            if (!existing) return prev;
            const next = {
                ...prev,
                [orderId]: { ...existing, managerComment: comment.slice(0, 500) },
            };
            saveAll(next);
            return next;
        });
    }, []);

    const decide = useCallback((orderId: number, approve: boolean) => {
        setRequests((prev) => {
            const existing = prev[orderId];
            if (!existing) return prev;
            const next: Record<number, CancellationRequest> = {
                ...prev,
                [orderId]: {
                    ...existing,
                    status: approve ? "approved" : "rejected",
                    decidedAt: new Date().toISOString(),
                },
            };
            saveAll(next);
            return next;
        });
    }, []);

    return { requests, getRequest, createRequest, setComment, decide };
}
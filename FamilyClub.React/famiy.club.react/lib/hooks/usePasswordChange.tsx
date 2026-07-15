"use client";

import { useState } from "react";
import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

export function usePasswordChange(userId: string) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const reset = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError(null);
    };

    const handleChangePassword = async () => {
        setError(null);

        if (!newPassword || !currentPassword) {
            setError("Заповніть всі поля");
            return false;
        }

        if (newPassword !== confirmPassword) {
            setError("Паролі не співпадають");
            return false;
        }

        setSubmitting(true);
        try {
            const token = getAuthToken();
            const res = await fetch(`${apiBasePath}/api/ClubMember/${userId}/change-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            if (!res.ok) {
                setError("Помилка — перевірте поточний пароль");
                return false;
            }

            reset();
            return true;
        } catch (e) {
            console.error(e);
            setError("Не вдалося змінити пароль");
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    return {
        currentPassword,
        setCurrentPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        submitting,
        error,
        handleChangePassword,
    };
}
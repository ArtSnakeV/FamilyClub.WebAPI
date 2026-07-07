"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clubMemberService, roleClubMemberService } from "@/lib/api/services";

export type ManagerRole = "Manager" | "Admin";

export interface ManagerFormState {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: ManagerRole;
    password: string;
    confirmPassword: string;
}

const initialState: ManagerFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "Manager",
    password: "",
    confirmPassword: "",
};

export function useAddManagerForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [form, setForm] = useState<ManagerFormState>(initialState);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ---------- пошук існуючого користувача ----------
    const [searchEmail, setSearchEmail] = useState("");
    const [searching, setSearching] = useState(false);
    const [userFound, setUserFound] = useState(false);
    const [existingUserId, setExistingUserId] = useState<string | null>(null);
    // --------------------------------------------------

    const updateField = <K extends keyof ManagerFormState>(
        key: K,
        value: ManagerFormState[K]
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearch = async () => {
        if (!searchEmail.trim()) {
            setError("Введіть email користувача");
            return;
        }

        setSearching(true);
        setError(null);

        try {
            const user = await clubMemberService.apiClubMemberByEmailEmailGet({
                email: searchEmail,
            });

            setExistingUserId(user.id ?? null);
            setUserFound(true);

            setForm((prev) => ({
                ...prev,
                firstName: user.name ?? "",
                lastName: user.surname ?? "",
                email: user.email ?? "",
                phone: user.phoneNumber ?? "",
                role: user.roles?.includes("Admin") ? "Admin" : "Manager",
            }));
        } catch {
            setUserFound(false);
            setExistingUserId(null);

            setForm((prev) => ({
                ...prev,
                firstName: "",
                lastName: "",
                email: searchEmail,
                phone: "",
                password: "",
                confirmPassword: "",
            }));

            setError("Користувача не знайдено. Буде створено нового.");
        } finally {
            setSearching(false);
        }
    };

    const handleSubmit = async () => {
        setError(null);

        try {
            setSubmitting(true);

            // Якщо користувач вже існує просто оновлюємо йому роль
            if (userFound && existingUserId) {
                await roleClubMemberService.apiRolesClubMemberIdAssignRolesPut({
                    id: existingUserId,
                    assignRolesDto: {
                        roles: [form.role],
                    },
                });

                router.back();
                return;
            }

            // Інакше створюємо нового користувача
            if (form.password !== form.confirmPassword) {
                setError("Паролі не співпадають");
                return;
            }

            await clubMemberService.apiClubMemberFormPost({
                email: form.email,
                password: form.password,
                phoneNumber: form.phone,
                name: form.firstName,
                surname: form.lastName,
                selectedRoles: [form.role],
            });

            router.back();
        } catch (e) {
            console.error(e);
            setError("Не вдалося виконати операцію");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (!id) return;

        const userId = id;

        async function loadUser() {
            const user = await clubMemberService.apiClubMemberIdGet({ id: userId });
            setExistingUserId(user.id ?? null);
            setUserFound(true);

            setForm((prev) => ({
                ...prev,
                firstName: user.name ?? "",
                lastName: user.surname ?? "",
                email: user.email ?? "",
                phone: user.phoneNumber ?? "",
                role: user.roles?.includes("Admin") ? "Admin" : "Manager",
            }));
        }

        loadUser();
    }, [id]);

    return {
        form,
        updateField,
        submitting,
        error,
        searchEmail,
        setSearchEmail,
        searching,
        userFound,
        handleSearch,
        handleSubmit,
    };
}
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { clubMemberService, roleClubMemberService, apiBasePath  } from "@/lib/api/services";

// export type ManagerRole = "Manager" | "Admin" | "User";

// export interface ManagerFormState {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     role: ManagerRole;
//     password: string;
//     confirmPassword: string;
//     dateOfBirth: Date | null;
//     avatarData: string | null; // base64
// }

// const initialState: ManagerFormState = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     role: "Manager",
//     password: "",
//     confirmPassword: "",
//     dateOfBirth: null,
//     avatarData: null,
// };

// export function useAddManagerForm() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const id = searchParams.get("id");

//     const [form, setForm] = useState<ManagerFormState>(initialState);
//     const [submitting, setSubmitting] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     // ---------- пошук існуючого користувача ----------
//     const [searchEmail, setSearchEmail] = useState("");
//     const [searching, setSearching] = useState(false);
//     const [userFound, setUserFound] = useState(false);
//     const [existingUserId, setExistingUserId] = useState<string | null>(null);
//     // --------------------------------------------------

//     const updateField = <K extends keyof ManagerFormState>(
//         key: K,
//         value: ManagerFormState[K]
//     ) => {
//         setForm((prev) => ({ ...prev, [key]: value }));
//     };

//     const handleSearch = async () => {
//         if (!searchEmail.trim()) {
//             setError("Введіть email користувача");
//             return;
//         }

//         setSearching(true);
//         setError(null);

//         try {
//             const user = await clubMemberService.apiClubMemberByEmailEmailGet({
//                 email: searchEmail,
//             });

//             setExistingUserId(user.id ?? null);
//             setUserFound(true);

//             setForm((prev) => ({
//                 ...prev,
//                 firstName: user.name ?? "",
//                 lastName: user.surname ?? "",
//                 email: user.email ?? "",
//                 phone: user.phoneNumber ?? "",
//                 role: user.roles?.includes("Admin") ? "Admin" : user.roles?.includes("User") ? "User" : "Manager",
//             }));
//         } catch {
//             setUserFound(false);
//             setExistingUserId(null);

//             setForm((prev) => ({
//                 ...prev,
//                 firstName: "",
//                 lastName: "",
//                 email: searchEmail,
//                 phone: "",
//                 password: "",
//                 confirmPassword: "",
//             }));

//             setError("Користувача не знайдено. Буде створено нового.");
//         } finally {
//             setSearching(false);
//         }
//     };

//     const handleSubmit = async () => {
//         setError(null);

//         try {
//             setSubmitting(true);

//             // Якщо користувач вже існує просто оновлюємо йому роль
//             if (userFound && existingUserId) {
//                 await roleClubMemberService.apiRolesClubMemberIdAssignRolesPut({
//                     id: existingUserId,
//                     assignRolesDto: {
//                         roles: [form.role],
//                     },
//                 });

//                 router.back();
//                 return;
//             }

//             // Інакше створюємо нового користувача
//             if (form.password !== form.confirmPassword) {
//                 setError("Паролі не співпадають");
//                 return;
//             }

//             await clubMemberService.apiClubMemberFormPost({
//                 email: form.email,
//                 password: form.password,
//                 phoneNumber: form.phone,
//                 name: form.firstName,
//                 surname: form.lastName,
//                 selectedRoles: [form.role],
//             });

//             router.back();
//         } catch (e) {
//             console.error(e);
//             setError("Не вдалося виконати операцію");
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     useEffect(() => {
//         if (!id) return;

//         const userId = id;

//         async function loadUser() {
//             const user = await clubMemberService.apiClubMemberIdGet({ id: userId });
//             setExistingUserId(user.id ?? null);
//             setUserFound(true);

//             setForm((prev) => ({
//                 ...prev,
//                 firstName: user.name ?? "",
//                 lastName: user.surname ?? "",
//                 email: user.email ?? "",
//                 phone: user.phoneNumber ?? "",
//                 role: user.roles?.includes("Admin") ? "Admin" : "Manager",
//             }));
//         }

//         loadUser();
//     }, [id]);

//     return {
//         form,
//         updateField,
//         submitting,
//         error,
//         searchEmail,
//         setSearchEmail,
//         searching,
//         userFound,
//         handleSearch,
//         handleSubmit,
//     };
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clubMemberService, roleClubMemberService, apiBasePath } from "@/lib/api/services";

export type ManagerRole = "Manager" | "Admin" | "User";

export interface ManagerFormState {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: ManagerRole;
    password: string;
    confirmPassword: string;
    dateOfBirth: Date | null;
    avatarData: string | null; // base64
}

const initialState: ManagerFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "Manager",
    password: "",
    confirmPassword: "",
    dateOfBirth: null,
    avatarData: null,
};

// Порядок важливий: перевіряємо від "вищої" ролі до "нижчої"
function resolveRole(roles?: string[] | null): ManagerRole {
    if (roles?.includes("Admin")) return "Admin";
    if (roles?.includes("Manager")) return "Manager";
    if (roles?.includes("User")) return "User";
    return "Manager";
}
function base64ToBlob(base64: string, mimeType: string): Blob {
    const byteString = atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
}

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

    const mapUserToForm = (user: {
        name?: string | null;
        surname?: string | null;
        email?: string | null;
        phoneNumber?: string | null;
        roles?: string[] | null;
        dateOfBirth?: string | Date | null;
        avatarData?: string | null;
    }): Partial<ManagerFormState> => ({
        firstName: user.name ?? "",
        lastName: user.surname ?? "",
        email: user.email ?? "",
        phone: user.phoneNumber ?? "",
        role: resolveRole(user.roles),
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
        avatarData: user.avatarData ?? null,
    });

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
                ...mapUserToForm(user),
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
                dateOfBirth: null,
                avatarData: null,
            }));

            setError("Користувача не знайдено. Буде створено нового.");
        } finally {
            setSearching(false);
        }
    };
   
    const updateExistingUserProfile = async (userId: string) => {
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("name", form.firstName ?? "");
        formData.append("surname", form.lastName ?? "");
        formData.append("phoneNumber", form.phone ?? "");

        if (form.dateOfBirth) {
            const d = form.dateOfBirth;
            const dateOnly = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
            formData.append("dateOfBirth", dateOnly);
        }

        if (form.avatarData) {
            formData.append("avatar", base64ToBlob(form.avatarData, "image/jpeg"), "avatar.jpg");
        }

        await fetch(`${apiBasePath}/api/ClubMember/${userId}/form`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
    };

    const handleSubmit = async () => {
        setError(null);

        try {
            setSubmitting(true);

            // Якщо користувач вже існує — оновлюємо профіль і роль
            if (userFound && existingUserId) {
                await updateExistingUserProfile(existingUserId);

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
            const avatarBlob = form.avatarData
                ? base64ToBlob(form.avatarData, "image/jpeg")
                : undefined;
            await clubMemberService.apiClubMemberFormPost({
                email: form.email,
                password: form.password,
                phoneNumber: form.phone,
                name: form.firstName,
                surname: form.lastName,
                selectedRoles: [form.role],
                dateOfBirth: form.dateOfBirth ?? undefined,
                avatar: avatarBlob,
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
                ...mapUserToForm(user),
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
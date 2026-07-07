// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { clubMemberService, roleClubMemberService } from "@/lib/api/services";
// import { useSearchParams } from "next/navigation";
// import ButtonReturn from "./ui/ButtonReturn";


// // const PERMISSIONS = [
// //     { key: "viewOrders", label: "Перегляд замовлень" },
// //     { key: "editOrders", label: "Редагування замовлень" },
// //     { key: "manageUsers", label: "Робота з користувачами" },
// //     { key: "viewAnalytics", label: "Перегляд аналітики" },
// //     { key: "manageComplaints", label: "Робота зі скаргами" },
// //     { key: "platformSettings", label: "Налаштування платформи" },
// // ] as const;

// // type PermissionKey = (typeof PERMISSIONS)[number]["key"];

// interface FormState {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     role: "Manager" | "Admin";
//     password: string;
//     confirmPassword: string;
//     // permissions: PermissionKey[];
// }

// const initialState: FormState = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     role: "Manager",
//     password: "",
//     confirmPassword: "",

// };

// export default function AddManagerPage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const id = searchParams.get("id");
//     const [form, setForm] = useState<FormState>(initialState);

//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const [submitting, setSubmitting] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     // ---------- пошук існуючого користувача ----------
//     const [searchEmail, setSearchEmail] = useState("");
//     const [searching, setSearching] = useState(false);
//     const [userFound, setUserFound] = useState(false);
//     const [existingUserId, setExistingUserId] = useState<string | null>(null);
//     // --------------------------------------------------

//     const updateField = <K extends keyof FormState>(
//         key: K,
//         value: FormState[K]
//     ) => {
//         setForm((prev) => ({
//             ...prev,
//             [key]: value,
//         }));
//     };

//     // const togglePermission = (key: PermissionKey) => {
//     //     setForm((prev) => ({
//     //         ...prev,
//     //         permissions: prev.permissions.includes(key)
//     //             ? prev.permissions.filter((p) => p !== key)
//     //             : [...prev.permissions, key],
//     //     }));
//     // };

//     const handleSearch = async () => {
//         if (!searchEmail.trim()) {
//             setError("Введіть email користувача");
//             return;
//         }

//         setSearching(true);
//         setError(null);

//         try {
//             const user =
//                 await clubMemberService.apiClubMemberByEmailEmailGet({
//                     email: searchEmail,
//                 });

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

//             // Якщо користувач вже існує — просто оновлюємо йому роль
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
//             const user = await clubMemberService.apiClubMemberIdGet({
//                 id: userId,
//             });
//             setExistingUserId(user.id ?? null);
//             setUserFound(true);

//             setForm(prev => ({
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
//     return (
//         <div className="min-h-screen flex flex-col "
//             style={{
//                 backgroundImage: "url('/images/authorPageAdmin/Rectangle 326.png')",
//                 backgroundSize: "100% 100%",
//             }}>
//             <div className="w-[100vw] min-h-screen relative">
//                 <img
//                     src="/images/authorPageAdmin/Rectangle 675.png"
//                     className="absolute"
//                     style={{ width: "100vw", height: "auto", top: "36px", left: "-20px" }}
//                     alt=""
//                 />
//                 <div className="top-20 left-16 relative z-10 flex flex-col gap-7 pb-3 mb-3">
//                     <div className="flex relative top-0 ml-0">
//                         <ButtonReturn />
//                     </div>

//                     <div className="flex flex-wrap gap-6 items-start">
//                         {/* Ліва картка — форма */}
//                         <div className="bg-[var(--color-white,#F7F5F1)] rounded-[10px] p-8 flex-1 min-w-[360px] max-w-[740px] flex flex-col gap-6">
//                             <h2 className="text-[32px] font-semibold text-[var(--color-black)]">
//                                 Основна інформація
//                             </h2>

//                             {/* Пошук існуючого користувача за email */}
//                             <div className="flex flex-col gap-1">
//                                 <label className="font-semibold text-sm text-[var(--color-black)]">
//                                     Пошук користувача за email
//                                 </label>
//                                 <div className="flex gap-2">
//                                     <input
//                                         type="email"
//                                         value={searchEmail}
//                                         onChange={(e) => setSearchEmail(e.target.value)}
//                                         placeholder="Введіть email для пошуку..."
//                                         className="flex-1 rounded-full bg-[#F0EDE7] px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-green)]"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={handleSearch}
//                                         disabled={searching}
//                                         className="px-5 rounded-full bg-[var(--color-green)] text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
//                                     >
//                                         {searching ? "Пошук..." : "Знайти"}
//                                     </button>
//                                 </div>
//                                 {userFound && (
//                                     <span className="text-xs text-[var(--color-green)]">
//                                         Користувача знайдено — дані підтягнуто нижче
//                                     </span>
//                                 )}
//                             </div>

//                             <div className="flex flex-col gap-1">
//                                 <label className="font-semibold text-sm text-[var(--color-black)]">Ім'я</label>
//                                 <input
//                                     type="text"
//                                     value={form.firstName}
//                                     onChange={(e) => updateField("firstName", e.target.value)}
//                                     placeholder="Введіть ім'я..."
//                                     disabled={userFound}
//                                     className="rounded-full bg-[#F0EDE7] px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-green)] disabled:opacity-60"
//                                 />
//                             </div>

//                             <div className="flex flex-col gap-1">
//                                 <label className="font-semibold text-sm text-[var(--color-black)]">Прізвище</label>
//                                 <input
//                                     type="text"
//                                     value={form.lastName}
//                                     onChange={(e) => updateField("lastName", e.target.value)}
//                                     placeholder="Введіть прізвище..."
//                                     disabled={userFound}
//                                     className="rounded-full bg-[#F0EDE7] px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-green)] disabled:opacity-60"
//                                 />
//                             </div>

//                             <div className="flex flex-col gap-1">
//                                 <label className="font-semibold text-sm text-[var(--color-black)]">Email</label>
//                                 <input
//                                     type="email"
//                                     value={form.email}
//                                     onChange={(e) => updateField("email", e.target.value)}
//                                     placeholder="Введіть email підтримки..."
//                                     disabled={userFound}
//                                     className="rounded-full bg-[#F0EDE7] px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-green)] disabled:opacity-60"
//                                 />
//                             </div>

//                             <div className="flex flex-col gap-1">
//                                 <label className="font-semibold text-sm text-[var(--color-black)]">Телефон</label>
//                                 <input
//                                     type="tel"
//                                     value={form.phone}
//                                     onChange={(e) => updateField("phone", e.target.value)}
//                                     placeholder="Введіть номер телефону..."
//                                     disabled={userFound}
//                                     className="rounded-full bg-[#F0EDE7] px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-green)] disabled:opacity-60"
//                                 />
//                             </div>

//                             <div className="flex flex-col gap-1">
//                                 <label className="font-semibold text-sm text-[var(--color-black)]">Роль</label>
//                                 <select
//                                     value={form.role}
//                                     onChange={(e) => updateField("role", e.target.value as FormState["role"])}
//                                     className="rounded-full bg-[#F0EDE7] px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-green)] appearance-none"
//                                 >
//                                     <option value="Manager">Менеджер</option>
//                                     <option value="Admin">Адмін</option>
//                                     <option value="User">Користувач</option>
//                                 </select>
//                             </div>

//                             {/* Пароль показуємо тільки для нового користувача */}
//                             {!userFound && (
//                                 <>
//                                     <div className="flex flex-col gap-1">
//                                         <label className="font-semibold text-sm text-[var(--color-black)]">Пароль</label>
//                                         <div className="relative">
//                                             <input
//                                                 type={showPassword ? "text" : "password"}
//                                                 value={form.password}
//                                                 onChange={(e) => updateField("password", e.target.value)}
//                                                 placeholder="Введіть пароль..."
//                                                 className="w-full rounded-full bg-[#F0EDE7] px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-green)]"
//                                             />
//                                             <button
//                                                 type="button"
//                                                 onClick={() => setShowPassword((p) => !p)}
//                                                 className="absolute right-4 top-1/2 -translate-y-1/2"
//                                                 aria-label="Показати/сховати пароль"
//                                             >
//                                                 <img
//                                                     src={`/images/usersPageAdmin/${showPassword ? "eye-slash-solid-full" : "eye-solid-full"}.png`}
//                                                     alt=""
//                                                     className="w-5 h-5 object-contain opacity-60"
//                                                 />
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-col gap-1">
//                                         <label className="font-semibold text-sm text-[var(--color-black)]">
//                                             Підтвердити пароль
//                                         </label>
//                                         <div className="relative">
//                                             <input
//                                                 type={showConfirmPassword ? "text" : "password"}
//                                                 value={form.confirmPassword}
//                                                 onChange={(e) => updateField("confirmPassword", e.target.value)}
//                                                 placeholder="Підтвердіть пароль..."
//                                                 className="w-full rounded-full bg-[#F0EDE7] px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-green)]"
//                                             />
//                                             <button
//                                                 type="button"
//                                                 onClick={() => setShowConfirmPassword((p) => !p)}
//                                                 className="absolute right-4 top-1/2 -translate-y-1/2"
//                                                 aria-label="Показати/сховати пароль"
//                                             >
//                                                 <img
//                                                     src={`/images/usersPageAdmin/${showConfirmPassword ? "eye-slash-solid-full" : "eye-solid-full"}.png`}
//                                                     alt=""
//                                                     className="w-5 h-5 object-contain opacity-60"
//                                                 />
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </>
//                             )}

//                             {/* <div className="flex flex-col gap-2">
//                                 <label className="font-semibold text-sm text-[var(--color-black)]">Дозволи</label>
//                                 <div className="flex flex-col gap-2">
//                                     {PERMISSIONS.map((perm) => (
//                                         <label
//                                             key={perm.key}
//                                             className="flex items-center gap-3 text-sm text-[var(--color-black)] cursor-pointer"
//                                         >
//                                             <span
//                                                 onClick={() => togglePermission(perm.key)}
//                                                 className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${form.permissions.includes(perm.key)
//                                                     ? "border-[var(--color-green)] bg-[var(--color-green)]"
//                                                     : "border-gray-400"
//                                                     }`}
//                                             />
//                                             {perm.label}
//                                         </label>
//                                     ))}
//                                 </div>
//                                 <span className="text-xs text-gray-500">Оберіть дозволи для менеджера</span>
//                             </div> */}

//                             {error && <p className="text-sm text-[#981717]">{error}</p>}

//                             <button
//                                 type="button"
//                                 onClick={handleSubmit}
//                                 disabled={submitting}
//                                 className="mt-2 h-[50px] rounded-[9px] bg-[var(--color-green)] text-white font-medium text-[18px] hover:opacity-90 transition disabled:opacity-50"
//                             >
//                                 {submitting
//                                     ? "Обробка..."
//                                     : userFound
//                                         ? "Оновити роль"
//                                         : "Додати менеджера"}
//                             </button>
//                         </div>

//                         {/* Права картка — інфо про ролі */}
//                         <div className="bg-[var(--color-white,#F7F5F1)] rounded-[10px] p-8 flex-1 min-w-[380px] max-w-[600px] flex flex-col gap-8">
//                             <h2 className="text-[22px] font-semibold text-[var(--color-black)]">
//                                 Про ролі менеджерів
//                             </h2>

//                             <div className="flex gap-4 items-start">
//                                 <img
//                                     src="/images/usersPageAdmin/user-secret-solid-full.png"
//                                     alt=""
//                                     className="w-9 h-9 object-contain shrink-0"
//                                 />
//                                 <div>
//                                     <p className="font-semibold text-[var(--color-green)] text-[18px]">Адмін</p>
//                                     <p className="text-sm text-[var(--color-black)] mt-1">
//                                         Повний доступ до всіх розділів системи. Може керувати користувачами,
//                                         налаштуваннями та безпекою.
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="flex gap-4 items-start">
//                                 <img
//                                     src="/images/usersPageAdmin/user-tie-solid-full.png"
//                                     alt=""
//                                     className="w-9 h-9 object-contain shrink-0"
//                                 />
//                                 <div>
//                                     <p className="font-semibold text-[var(--color-green)] text-[18px]">Менеджер</p>
//                                     <p className="text-sm text-[var(--color-black)] mt-1">
//                                         Доступ до замовлень і базових інструментів для роботи клієнта.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// }
"use client";

import ButtonReturn from "./ui/ButtonReturn";
import UserSearchBlock from "./sections/UserSearchBlock";
import ManagerInfoFields from "./sections/ManagerInfoFields";
import ManagerPasswordFields from "./sections/ManagerPasswordFields";
import RolesInfoCard from "./ui/RolesInfoCard";
import { useAddManagerForm } from "./hooks/useAddManagerForm";

export default function AddManagerPage() {
    const {
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
    } = useAddManagerForm();

    return (
        <div
            className="w-full min-h-screen overflow-hidden relative m-0 p-0 flex flex-col"
            style={{
                backgroundImage: "url('/images/authorPageAdmin/Rectangle 326.png')",
                backgroundSize: "100% 100%",
            }}
        >
            <div className="w-[1600px] h-[1150px] relative top-[36px] left-[-20px]"
                style={{
                    backgroundImage: "url('/images/authorPageAdmin/Rectangle 675.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                }}>
                {/* <img
                    src="/images/authorPageAdmin/Rectangle 675.png"
                    className="absolute"
                    style={{ width: "100vw", height: "auto", top: "36px", left: "-20px" }}
                    alt=""
                /> */}
                <div className="top-10 left-16 relative z-10 flex flex-col gap-7">
                    <div className="flex relative top-0 ml-0">
                        <ButtonReturn />
                    </div>

                    <div className="flex flex-wrap gap-6 items-start">
                        {/* Ліва картка — форма */}
                        <div className="bg-[var(--color-white,#F7F5F1)] rounded-[10px] p-8 flex-1 min-w-[360px] max-w-[740px] flex flex-col gap-6">
                            <h2 className="text-[32px] font-semibold text-[var(--color-black)]">
                                Основна інформація
                            </h2>

                            <UserSearchBlock
                                searchEmail={searchEmail}
                                onSearchEmailChange={setSearchEmail}
                                searching={searching}
                                userFound={userFound}
                                onSearch={handleSearch}
                            />

                            <ManagerInfoFields form={form} updateField={updateField} disabled={userFound} />

                            {/* Пароль показуємо тільки для нового користувача */}
                            {!userFound && (
                                <ManagerPasswordFields form={form} updateField={updateField} />
                            )}

                            {error && <p className="text-sm text-[#981717]">{error}</p>}

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="mt-2 h-[50px] rounded-[9px] bg-[var(--color-green)] text-white font-medium text-[18px] hover:opacity-90 transition disabled:opacity-50"
                            >
                                {submitting
                                    ? "Обробка..."
                                    : userFound
                                        ? "Оновити профіль користувача"
                                        : "Додати менеджера"}
                            </button>
                        </div>

                        {/* Права картка — інфо про ролі */}
                        <RolesInfoCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
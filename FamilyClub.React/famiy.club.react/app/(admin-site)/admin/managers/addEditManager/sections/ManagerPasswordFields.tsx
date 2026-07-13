import { useState } from "react";
import type { ManagerFormState } from "../hooks/useAddManagerForm";

interface ManagerPasswordFieldsProps {
    form: ManagerFormState;
    updateField: <K extends keyof ManagerFormState>(key: K, value: ManagerFormState[K]) => void;
}

export default function ManagerPasswordFields({ form, updateField }: ManagerPasswordFieldsProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm text-[var(--color-black)]">Пароль</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => updateField("password", e.target.value)}
                        placeholder="Введіть пароль..."
                        className="w-full rounded-[10px] shadow-[0_0_10px_0_#00000040] bg-[#F0EDE7] px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-green)]"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        aria-label="Показати/сховати пароль"
                    >
                        <img
                            src={`/images/addManagerPageAdmin/${showPassword ? "eye-solid-full 1.png" : "eye-slash-solid-full.png"}`}
                            alt=""
                            className="w-5 h-5 object-contain opacity-60"
                        />
                    </button>
                </div>
                <span className="text-xs text-gray-500">
                    Пароль має містити мінімум одну літеру, цифру та спецсимвол (наприклад: !, @, #, $)
                </span>
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm text-[var(--color-black)]">
                    Підтвердити пароль
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={form.confirmPassword}
                        onChange={(e) => updateField("confirmPassword", e.target.value)}
                        placeholder="Підтвердіть пароль..."
                        className="w-full rounded-[10px] shadow-[0_0_10px_0_#00000040] bg-[#F0EDE7] px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-green)]"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((p) => !p)}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        aria-label="Показати/сховати пароль"
                    >
                        <img
                            src={`/images/addManagerPageAdmin/${showConfirmPassword ? "eye-solid-full 1.png" : "eye-slash-solid-full.png"}`}
                            alt=""
                            className="w-5 h-5 object-contain opacity-60"
                        />
                    </button>

                </div>
            </div>
        </>
    );
}
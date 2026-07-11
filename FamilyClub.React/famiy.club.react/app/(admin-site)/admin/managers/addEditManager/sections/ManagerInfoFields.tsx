import type { ManagerFormState } from "../hooks/useAddManagerForm";

interface ManagerInfoFieldsProps {
    form: ManagerFormState;
    updateField: <K extends keyof ManagerFormState>(key: K, value: ManagerFormState[K]) => void;
    disabled: boolean;
}

export default function ManagerInfoFields({ form, updateField, disabled }: ManagerInfoFieldsProps) {
    return (
        <>
            <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm text-[var(--color-black)]">Ім'я</label>
                <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder="Введіть ім'я..."
                    disabled={disabled}
                    className="rounded-[10px] shadow-[0_0_10px_0_#00000040] bg-[#F0EDE7] px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-green)] disabled:opacity-60"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm text-[var(--color-black)]">Прізвище</label>
                <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="Введіть прізвище..."
                    disabled={disabled}
                    className="rounded-[10px] shadow-[0_0_10px_0_#00000040] bg-[#F0EDE7] px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-green)] disabled:opacity-60"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm text-[var(--color-black)]">Email</label>
                <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="Введіть email підтримки..."
                    disabled={disabled}
                    className="rounded-[10px] shadow-[0_0_10px_0_#00000040] bg-[#F0EDE7] px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-green)] disabled:opacity-60"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm text-[var(--color-black)]">Телефон</label>
                <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="Введіть номер телефону..."
                    disabled={disabled}
                    className="rounded-[10px] shadow-[0_0_10px_0_#00000040] bg-[#F0EDE7] px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-green)] disabled:opacity-60"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold text-sm text-[var(--color-black)]">Роль</label>
                <select
                    value={form.role}
                    onChange={(e) => updateField("role", e.target.value as ManagerFormState["role"])}
                    className="rounded-[10px] shadow-[0_0_10px_0_#00000040] bg-[#F0EDE7] px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-green)] appearance-none"
                >
                    <option value="Manager">Менеджер</option>
                    <option value="Admin">Адмін</option>
                    <option value="User">Користувач</option>
                </select>
            </div>
        </>
    );
}
import Image from "next/image";
import { RoleDisplayInfo } from "../data/rolesData";

interface RoleDetailsPanelProps {
    role: RoleDisplayInfo;
    count: number;
    onSave: () => void;
}

export default function RoleDetailsPanel({
    role,
    count,
    onSave,
}: RoleDetailsPanelProps) {
    return (
        <div
            className="w-[320px] min-w-[280px] rounded-2xl px-6 py-6 flex flex-col gap-5 overflow-hidden"
            style={{
                backgroundImage: "url('/images/usersPageAdmin/Rectangle 795.png')",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="flex items-center gap-4">
                <Image src={role.icon} alt={role.title} width={72} height={72} />
                <div>
                    <h3 className="font-semibold text-[22px] text-[#1F1F1F]">
                        {role.title}
                    </h3>
                    <p className="text-[34px] font-semibold leading-none text-[#1F1F1F]">
                        {count.toLocaleString("uk-UA")}
                    </p>
                </div>
            </div>

            <div>
                <p className="mb-2 font-semibold text-[16px]">Опис</p>
                <p className="text-[14px] leading-relaxed text-[#4A4A4A]">
                    {role.description}
                </p>
            </div>

            <div>
                <p className="mb-3 font-semibold text-[16px]">Основні можливості</p>
                <ul className="space-y-2">
                    {role.capabilities.map((item) => (
                        <li
                            key={item}
                            className="flex items-start gap-2 text-[14px] text-[#2F2F2F]"
                        >
                            <span
                                className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                                style={{ backgroundColor: "#1F7A4D" }}
                            >
                                <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M1.5 5.2L3.8 7.5L8.5 2.5"
                                        stroke="white"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                type="button"
                onClick={onSave}
                className="mt-auto w-full rounded-xl bg-[var(--color-green)] px-4 py-3 text-[15px] font-semibold text-white transition hover:opacity-90"
            >
                Зберегти зміни доступів
            </button>
        </div>
    );
}

"use client";

import { UserInfo } from "../../hooks/useAllUsersInfo";
import { useTheme } from "@/lib/theme/ThemeProvider";

interface Props {
    user: UserInfo;
}

export default function OneUserInfoCard({ user }: Props) {
    const { theme } = useTheme();
    const isNight = theme === "ink-night";
    const ink = isNight ? "var(--color-cream)" : "var(--color-black)";
    const muted = isNight ? "rgba(237, 232, 223, 0.75)" : "rgba(36, 36, 36, 0.65)";

    return (
        <div className="w-[490px] max-w-full mt-4 h-auto min-h-[140px] gap-8 flex flex-row flex-wrap items-center justify-center">
            {user.avatarData ? (
                <img
                    src={`data:image/jpeg;base64,${user.avatarData}`}
                    alt="avatar"
                    className="w-[130px] h-[130px] rounded-full object-cover shrink-0"
                />
            ) : (
                <div
                    className="w-[130px] h-[130px] rounded-full flex items-center justify-center font-bold text-2xl shrink-0"
                    style={{
                        backgroundColor: isNight ? "rgba(237,232,223,0.15)" : "#d1d5db",
                        color: muted,
                    }}
                >
                    {user.name?.[0] ?? "?"}
                </div>
            )}
            <div className="flex flex-col gap-4 text-left min-w-0 flex-1">
                <p
                    className="font-semibold text-[24px] mt-4 text-left truncate"
                    style={{ color: ink }}
                >
                    {user.name} {user.surname}
                </p>
                <p className="text-[15px] text-left truncate w-full" style={{ color: ink }}>
                    {user.email}
                </p>
                <p className="text-[15px] truncate w-full" style={{ color: muted }}>
                    ID: {user.id}
                </p>
            </div>
        </div>
    );
}

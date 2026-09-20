"use client";

import { UserInfo } from "../hooks/useAllUsersInfo";
import { useTheme } from "@/lib/theme/ThemeProvider";

interface Props {
    user: UserInfo;
    variant?: "card" | "row";
}

export default function UserCard({ user, variant = "card" }: Props) {
    const { theme } = useTheme();
    const isNight = theme === "ink-night";
    const ink = isNight ? "var(--color-cream)" : "var(--color-black)";
    const muted = isNight ? "rgba(237, 232, 223, 0.75)" : "rgba(36, 36, 36, 0.55)";

    if (variant === "row") {
        return (
            <div className="flex items-center gap-2">
                {user.avatarData ? (
                    <img
                        src={`data:image/jpeg;base64,${user.avatarData}`}
                        alt="avatar"
                        className="w-[60px] h-[60px] rounded-full object-cover"
                    />
                ) : (
                    <div
                        className="w-[60px] h-[60px] rounded-full flex items-center justify-center font-bold"
                        style={{
                            backgroundColor: isNight ? "rgba(237,232,223,0.15)" : "#d1d5db",
                            color: muted,
                        }}
                    >
                        {user.name?.[0] ?? "?"}
                    </div>
                )}
                <div>
                    <p className="font-semibold" style={{ color: ink }}>
                        {user.name} {user.surname}
                    </p>
                    <p className="text-sm" style={{ color: muted }}>
                        {user.email}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[200px] h-[220px] rounded-2xl bg-[var(--background-elevated)] shadow-[var(--shadow-card)] flex flex-col items-center justify-center px-4 py-6">
            {user.avatarData ? (
                <img
                    src={`data:image/jpeg;base64,${user.avatarData}`}
                    alt="avatar"
                    className="w-20 h-20 rounded-full object-cover"
                />
            ) : (
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl"
                    style={{
                        backgroundColor: isNight ? "rgba(237,232,223,0.15)" : "#d1d5db",
                        color: muted,
                    }}
                >
                    {user.name?.[0] ?? "?"}
                </div>
            )}
            <p className="font-semibold mt-4 text-center" style={{ color: ink }}>
                {user.name} {user.surname}
            </p>
            <p className="text-sm text-center truncate w-full" style={{ color: muted }}>
                {user.email}
            </p>
        </div>
    );
}

"use client";

import { UserInfo } from "../../hooks/useAllUsersInfo";

interface Props {
    user: UserInfo;
    variant?: "card" | "row";
}

export default function UserCardBlockedUser({ user, variant = "card" }: Props) {
    if (variant === "row") {
        return (
            <div className="flex w-[620px] items-center gap-2">
                {user.avatarData ? (
                    <img
                        src={`data:image/jpeg;base64,${user.avatarData}`}
                        alt="avatar"
                        className="w-[60px] h-[60px] rounded-full object-cover"
                    />
                ) : (
                    <div className="w-[60px] h-[60px] rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                        {user.name?.[0] ?? "?"}
                    </div>
                )}
                <div className="flex flex-col gap-1 w-[300px] ">
                    <p className="font-semibold text-gray-800">
                        {user.name} {user.surname}
                    </p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                    <p className="text-sm text-gray-400 w-[300px]">{user.id}</p>
                </div>
            </div>
        );
    }
    return (
        <div className="w-[200px] h-[220px] rounded-2xl bg-white shadow-sm flex flex-col items-center justify-center px-4 py-6">
            {user.avatarData ? (
                <img
                    src={`data:image/jpeg;base64,${user.avatarData}`}
                    alt="avatar"
                    className="w-20 h-20 rounded-full object-cover"
                />
            ) : (
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-2xl">
                    {user.name?.[0] ?? "?"}
                </div>
            )}
            <p className="font-semibold text-gray-800 mt-4 text-center">
                {user.name} {user.surname}
            </p>
            <p className="text-sm text-gray-400 text-center truncate w-full">{user.email}</p>
            <p className="text-sm text-gray-400 text-center truncate w-full">{user.id}</p>
        </div>
    );
}
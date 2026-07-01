"use client";

import { UserInfo } from "../../hooks/useAllUsersInfo";

interface Props {
    user: UserInfo;
}

export default function ReviewsTab({ user }: Props) {
    return <p className="text-gray-400 text-sm">Відгуки користувача {user.name} — тут буде список.</p>;
}
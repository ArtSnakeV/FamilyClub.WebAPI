"use client";

import { UserInfo } from "../hooks/useAllUsersInfo";
import UserCard from "../section/UserCard";

interface Props {
    users: UserInfo[];
}

export default function SectionCardUsers({ users }: Props) {
    return (
        <div className="flex flex-wrap gap-4">
            {users.map((user) => (
                <UserCard key={user.id} user={user} variant="card" />
            ))}
        </div>
    );
}
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useAllUsersInfo, { UserInfo } from "../hooks/useAllUsersInfo";
import { lockUser, unlockUser, deleteUser } from "../api/ActionUsers";
import { useBlockedUsersStats } from "./hooks/useBlockedUsersStats";
import BlockedSectionUsersHeader from "./section/BlockedSectionUsersHeader";
import AllBlockedUsersInfo from "./section/AllBlockedUsersInfo";
import BlockFilteredBlockedUsers from "./section/searchSetions/BlockFilteredBlockedUsers";
import BlockTabsBlockedUsers from "./section/searchSetions/BlockTabsBlockedUsers";
import { isBlocked, isPermanentBlock } from "./hooks/blockUtils";
import EmptyDiv from "./ui/EmptyDiv";

const EXPIRING_SOON_DAYS = 7;
const isExpiringSoon = (user: UserInfo) => {
    if (!isBlocked(user.lockoutEnd) || isPermanentBlock(user.lockoutEnd)) return false;
    const days = (new Date(user.lockoutEnd!).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return days <= EXPIRING_SOON_DAYS;
};
type TabKey = "allBlocked" | "temporary" | "permanent" | "expiring" | "active";

export default function Page() {
    const router = useRouter();
    const { usersInfo, loadingUsersInfo } = useAllUsersInfo();

    const [localUsers, setLocalUsers] = useState<UserInfo[]>([]);
    const [selectedUserId, setSelectedUserIdBlocked] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [reason, setReason] = useState("all");
    const [sort, setSort] = useState("newest");

    useEffect(() => {
        setLocalUsers(usersInfo);
    }, [usersInfo]);

    const blockedUsers = localUsers.filter((u) => isBlocked(u.lockoutEnd));
    const temporaryBlocked = blockedUsers.filter((u) => !isPermanentBlock(u.lockoutEnd));
    const permanentBlocked = blockedUsers.filter((u) => isPermanentBlock(u.lockoutEnd));
    const expiringSoon = blockedUsers.filter(isExpiringSoon);
    const activeUsers = localUsers.filter((u) => !isBlocked(u.lockoutEnd));

    const tabs = [
        { key: "allBlocked" as TabKey, label: "Всі заблоковані", count: blockedUsers.length },
        { key: "temporary" as TabKey, label: "Тимчасово заблоковані", count: temporaryBlocked.length },
        { key: "permanent" as TabKey, label: "Заблоковані назавжди", count: permanentBlocked.length },
        { key: "expiring" as TabKey, label: "Закінчуються скоро", count: expiringSoon.length },
        { key: "active" as TabKey, label: "Активні користувачі", count: activeUsers.length },
    ];

    const blockedCount = blockedUsers.length;

    const { stats, loading } = useBlockedUsersStats(localUsers);
    const filteredUsersByStatus = useMemo(() => {
        switch (status) {
            case "temporary":
                return temporaryBlocked;

            case "permanent":
                return permanentBlocked;

            case "expiring":
                return expiringSoon;

            case "active":
                return activeUsers;

            case "allBlocked":
                return blockedUsers;
            default:
                return localUsers;
        }
    }, [
        status,
        blockedUsers,
        temporaryBlocked,
        permanentBlocked,
        expiringSoon,
        activeUsers,
        localUsers,
    ]);
    useEffect(() => {
        if (!selectedUserId && filteredUsersByStatus.length > 0) {
            setSelectedUserIdBlocked(filteredUsersByStatus[0].id);
        }
    }, [filteredUsersByStatus, selectedUserId]);

    useEffect(() => {
        document.body.style.backgroundImage = "url('/images/usersPageAdmin/Rectangle326.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";

        return () => {
            document.body.style.backgroundImage = "";
            document.body.style.backgroundSize = "";
            document.body.style.backgroundAttachment = "";
            document.body.style.backgroundPosition = "";
            document.body.style.backgroundRepeat = "";
        };
    }, []);

    const handleLockToggle = async (user: UserInfo) => {
        const blocked = isBlocked(user.lockoutEnd);

        if (blocked) {
            await unlockUser(user.id);
        } else {
            await lockUser(user.id);
        }

        setLocalUsers((prev) =>
            prev.map((u) =>
                u.id === user.id
                    ? {
                        ...u,
                        lockoutEnd: blocked
                            ? null
                            : new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 100).toISOString(),
                    }
                    : u
            )
        );

        if (blocked && selectedUserId === user.id) {
            setSelectedUserIdBlocked(null);
        }
    };

    const handleDeleteUser = async (user: UserInfo) => {
        await deleteUser(user.id);
        setLocalUsers((prev) => prev.filter((u) => u.id !== user.id));
        if (selectedUserId === user.id) {
            setSelectedUserIdBlocked(null);
        }
    };

    return (
        <div className="w-full min-h-screen overflow-hidden relative m-0 p-0">
            <div className="w-[100vw] min-h-screen relative">
                <img
                    src="/images/usersPageAdmin/Rectangle 675.png"
                    className="absolute"
                    style={{ width: "100vw", height: "auto", top: "-40px", left: "-20px" }}
                    alt=""
                />

                <button
                    type="button"
                    onClick={() => router.push("/admin/users")}
                    className="absolute top-1 left-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/70 hover:bg-white transition"
                    aria-label="Назад"
                >
                    <img
                        src="/images/blockedUsersPageAdmin/keyboard_backspace_24px.png"
                        alt=""
                        className="w-7 h-7 object-contain"
                    />
                </button>

                <div className="flex h-[20vh] flex-row relative items-center mt-20 ml-2 gap-0">
                    {loading || !stats
                        ? <p>Завантаження...</p>
                        : stats.map((stat) => (
                            <BlockedSectionUsersHeader key={stat.title} {...stat} />
                        ))}
                </div>

                <div className="flex relative mt-[6vh] ml-2 gap-2 items-start">
                    <BlockFilteredBlockedUsers
                        search={search}
                        status={status}
                        reason={reason}
                        sort={sort}
                        onSortChange={setSort}
                        onSearchChange={setSearch}
                        onStatusChange={(value) => setStatus(value as TabKey)}
                        onReasonChange={(value) => setReason(value)} />
                </div>

                <div className="flex relative mt-[1vh] ml-3 gap-2 items-start">
                    <BlockTabsBlockedUsers tabs={tabs}
                        // activeTab={status}
                        activeTab={status === "all" ? "" : status}
                        onChange={(k) => setStatus(k as TabKey)} />
                </div>

                <div className="flex flex-row relative mt-[1vh] -ml-2 gap-2 items-start">
                    {loadingUsersInfo ? (
                        <p>Завантаження...</p>
                    ) : filteredUsersByStatus.length === 0 ? (

                        <EmptyDiv />
                    ) : (
                        <AllBlockedUsersInfo
                            users={filteredUsersByStatus}
                            search={search}
                            status={status}
                            reason={reason}
                            sort={sort}
                            onSelectUser={(u) => setSelectedUserIdBlocked(u.id)}
                            selectedUserId={selectedUserId ?? undefined}
                            onLockToggle={handleLockToggle}
                            onDelete={handleDeleteUser}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
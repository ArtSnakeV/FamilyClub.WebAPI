"use client";

import { useEffect, useState } from "react";
import BlockForUsersInfo from "./section/BlockForUsersInfo";
import { useUsersStats } from "./hooks/useUsersStats";
import useAllUsersInfo, { UserInfo } from "./hooks/useAllUsersInfo";
import AllUsersInfo from "./section/AllUsersInfo";
import OneUserInfo from "./section/oneUserInfo/OneUserInfo";
import { deleteUser } from "./api/ActionUsers";
import QuickActionsBar from "./section/QuickActionsBar";
import { useRouter } from "next/navigation";
import { useLockUserFlow } from "./hooks/useLockUserFlow";
import LockUserModal from "./blockedUsers/ui/LockUserModal";
import { usePagination } from "./hooks/usePagination";
import useNotifications from "@/app/(user-site)/notifications/hooks/useNotifications";
import NotificationThread from "@/app/(user-site)/notifications/components/NotificationThread";
import { useCurrentUser } from "@/app/(user-site)/userProfile/hooks/useCurrentUser";

export default function Page() {
    const { user: admin } = useCurrentUser();
    const router = useRouter();
    const { usersInfo, loadingUsersInfo, refetch } = useAllUsersInfo();
    const [messageUser, setMessageUser] = useState<UserInfo | null>(null);

    const [localUsers, setLocalUsers] = useState<UserInfo[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const { userToLock, setUserToLock, handleLockToggle, handleConfirmLock } =
        useLockUserFlow(refetch);

    useEffect(() => {
        setLocalUsers(usersInfo);
    }, [usersInfo]);

    const blockedCount = localUsers.filter(
        (u) => !!u.lockoutEnd && new Date(u.lockoutEnd).getTime() > Date.now()
    ).length;

    const { stats, loading } = useUsersStats(
        localUsers.length > 0 ? blockedCount : undefined
    );

    useEffect(() => {
        if (!selectedUserId && localUsers.length > 0) {
            setSelectedUserId(localUsers[0].id);
        }
    }, [localUsers, selectedUserId]);

    useEffect(() => {
        document.body.style.backgroundImage =
            "url('/images/usersPageAdmin/Rectangle326.png')";
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

    const handleDeleteUser = async (user: UserInfo) => {
        await deleteUser(user.id);

        setLocalUsers((prev) => prev.filter((u) => u.id !== user.id));

        if (selectedUserId === user.id) {
            setSelectedUserId(null);
        }
    };

    const selectedUser = localUsers.find((u) => u.id === selectedUserId) ?? null;
    const {
        notifications,
        loadingNotifications,
        sendMessage,
    } = useNotifications(messageUser?.id);
    return (
        <div className="w-full min-h-screen overflow-hidden relative m-0 p-0">
            <div className="w-[100vw] min-h-screen relative">
                <img
                    src="/images/usersPageAdmin/Rectangle 675.png"
                    className="absolute"
                    style={{ width: "100vw", height: "auto", top: "-40px", left: "-20px" }}
                    alt=""
                />
                <div className="flex flex-row relative items-center mt-24 ml-4 gap-4">
                    {loading || !stats
                        ? <p>Завантаження...</p>
                        : stats.map((stat) => (
                            <BlockForUsersInfo key={stat.title} {...stat} />
                        ))}
                </div>
                <div className="flex flex-row relative mt-2 mx-4 gap-6 items-start">
                    {loadingUsersInfo ? (
                        <p>Завантаження...</p>
                    ) : (
                        <AllUsersInfo
                            users={localUsers}
                            onSelectUser={(u) => setSelectedUserId(u.id)}
                            selectedUserId={selectedUser?.id}
                            onLockToggle={handleLockToggle}
                            onDelete={handleDeleteUser}
                            onMessage={(user) => setMessageUser(user)}
                        />
                    )}

                    {selectedUser && (
                        <OneUserInfo
                            user={selectedUser}
                            onLockToggle={handleLockToggle}
                        />
                    )}
                </div>

                <QuickActionsBar
                    onAddManager={() => router.push(`/admin/managers/addEditManager`)}
                />

                {userToLock && (
                    <LockUserModal
                        user={userToLock}
                        onConfirm={handleConfirmLock}
                        onCancel={() => setUserToLock(null)}
                    />
                )}


                {messageUser && (
                    <NotificationThread
                        open={true}
                        onClose={() => setMessageUser(null)}
                        messages={notifications}
                        currentUserId={admin?.id}
                        threadOwnerId={messageUser.id}
                        title={`Повідомлення — ${messageUser.name ?? ""} ${messageUser.surname ?? ""}`}
                        avatarSrc={
                            messageUser.avatarData
                                ? messageUser.avatarData.startsWith("data:")
                                    ? messageUser.avatarData
                                    : `data:image/jpeg;base64,${messageUser.avatarData}`
                                : undefined
                        }
                        avatarFallback={
                            messageUser.name?.[0] ?? "👤"
                        }
                        formatDate={(date?: Date) => {
                            if (!date) return "";

                            return new Date(date).toLocaleString("uk-UA", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            });
                        }}
                        onSend={(text) =>
                            sendMessage(
                                text,
                                messageUser.id,
                                admin?.id ?? ""
                            )
                        }
                    />
                )}
            </div>
        </div>
    );
}
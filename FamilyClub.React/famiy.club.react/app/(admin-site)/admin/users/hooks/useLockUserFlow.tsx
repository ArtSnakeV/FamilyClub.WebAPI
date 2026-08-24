import { alertError } from "@/lib/ui/sweetAlert";
import { useState } from "react";
import { UserInfo } from "./useAllUsersInfo";
import { lockUser, unlockUser } from "../api/ActionUsers";
import { isBlocked } from "./blockUtils"; 

export function useLockUserFlow(refetch: () => Promise<void>) {
    const [userToLock, setUserToLock] = useState<UserInfo | null>(null);

    const handleLockToggle = async (user: UserInfo) => {
        if (isBlocked(user.lockoutEnd)) {
            try {
                await unlockUser(user.id);
                await refetch();
            } catch (e) {
                console.error(e);
                await alertError(
                    e instanceof Error
                        ? e.message
                        : "Не вдалося розблокувати користувача"
                );
            }
        } else {
            setUserToLock(user);
        }
    };

    const handleConfirmLock = async (
        blockReasonId: number,
        comment: string,
        lockoutEnd: string | null
    ) => {
        if (!userToLock) return;

        try {
            await lockUser(userToLock.id, { blockReasonId, comment, lockoutEnd });
            await refetch();
        } catch (e) {
            console.error(e);
            await alertError(
                e instanceof Error
                    ? e.message
                    : "Не вдалося заблокувати користувача"
            );
        } finally {
            setUserToLock(null);
        }
    };

    return { userToLock, setUserToLock, handleLockToggle, handleConfirmLock };
}
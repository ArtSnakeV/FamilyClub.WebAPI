import { useState } from "react";
import { UserInfo } from "./useAllUsersInfo";
import { lockUser, unlockUser } from "../api/ActionUsers";
import { isBlocked } from "./blockUtils"; 

export function useLockUserFlow(refetch: () => Promise<void>) {
    const [userToLock, setUserToLock] = useState<UserInfo | null>(null);

    const handleLockToggle = async (user: UserInfo) => {
        if (isBlocked(user.lockoutEnd)) {
            await unlockUser(user.id);
            await refetch();
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

        await lockUser(userToLock.id, { blockReasonId, comment, lockoutEnd });
        await refetch();

        setUserToLock(null);
    };

    return { userToLock, setUserToLock, handleLockToggle, handleConfirmLock };
}
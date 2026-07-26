"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useCurrentUser } from "@/app/(user-site)/userProfile/hooks/useCurrentUser";
import {
    AccessMatrixMap,
    canAccessPath,
    hasPermission,
    isAdminRole,
    loadAccessMatrix,
    PermissionId,
    SIDEBAR_ITEMS,
    subscribeAccessMatrixChange,
} from "@/lib/auth/accessControl";

export function useAccessControl() {
    const { user, loading: userLoading } = useCurrentUser();
    const [matrix, setMatrix] = useState<AccessMatrixMap>(() =>
        typeof window === "undefined" ? {} : loadAccessMatrix()
    );
    const [matrixReady, setMatrixReady] = useState(false);

    useEffect(() => {
        setMatrix(loadAccessMatrix());
        setMatrixReady(true);
        return subscribeAccessMatrixChange(() => {
            setMatrix(loadAccessMatrix());
        });
    }, []);

    const roles = user?.roles ?? [];

    const can = useCallback(
        (permissionId: PermissionId | string) =>
            hasPermission(roles, permissionId, matrix),
        [roles, matrix]
    );

    const canPath = useCallback(
        (pathname: string) => canAccessPath(pathname, roles, matrix),
        [roles, matrix]
    );

    const allowedSidebarItems = useMemo(
        () =>
            SIDEBAR_ITEMS.filter((item) => {
                if (item.adminOnly) return isAdminRole(roles);
                return (
                    item.permission === null ||
                    hasPermission(roles, item.permission, matrix)
                );
            }),
        [roles, matrix]
    );

    return {
        user,
        roles,
        matrix,
        loading: userLoading || !matrixReady,
        can,
        canPath,
        allowedSidebarItems,
        isAdmin: isAdminRole(roles),
    };
}

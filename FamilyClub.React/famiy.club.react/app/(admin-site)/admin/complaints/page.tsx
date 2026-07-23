"use client";

import { useEffect, useMemo, useState } from "react";
import {
    ClubMemberApi,
    ComplaintsApi,
    Configuration,
    ClubMemberReadDto,
    ComplaintsReadDto,
} from "@/lib/api/generated";
import { getAuthToken } from "@/lib/auth/tokenStorage";
import { apiBasePath } from "@/lib/api/services";
import { useAccessControl } from "@/lib/auth/useAccessControl";
import { normalizeRoleKey } from "@/app/(admin-site)/admin/roles/data/rolesData";
import AdminComplaintsPanel from "./components/AdminComplaintsPanel";
import ManagerComplaintsPanel from "./components/ManagerComplaintsPanel";

async function fetchManagers(token: string): Promise<ClubMemberReadDto[]> {
    const results = await Promise.allSettled(
        ["Manager", "Admin"].map(async (roleName) => {
            const res = await fetch(
                `${apiBasePath}/api/RolesClubMember/${encodeURIComponent(roleName)}/users`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (!res.ok) return [] as ClubMemberReadDto[];
            const data = await res.json();
            return Array.isArray(data) ? (data as ClubMemberReadDto[]) : [];
        })
    );

    const byId = new Map<string, ClubMemberReadDto>();
    for (const result of results) {
        if (result.status !== "fulfilled") continue;
        for (const user of result.value) {
            const id = user.id;
            if (!id || byId.has(id)) continue;
            byId.set(id, user);
        }
    }
    return [...byId.values()];
}

export default function ComplaintsPage() {
    const { roles: userRoles, loading: accessLoading } = useAccessControl();
    const isAdmin = userRoles.some((r) => normalizeRoleKey(r) === "Admin");

    const [complaints, setComplaints] = useState<ComplaintsReadDto[]>([]);
    const [members, setMembers] = useState<ClubMemberReadDto[]>([]);
    const [managers, setManagers] = useState<ClubMemberReadDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            const token = getAuthToken();
            if (!token) {
                setIsLoading(false);
                return;
            }

            const config = new Configuration({
                basePath: apiBasePath,
                headers: { Authorization: `Bearer ${token}` },
            });
            const complaintsApi = new ComplaintsApi(config);
            const memberApi = new ClubMemberApi(config);

            try {
                const results = await Promise.allSettled([
                    complaintsApi.apiComplaintsGet(),
                    memberApi.apiClubMemberGet(),
                    fetchManagers(token),
                ]);

                if (cancelled) return;

                const [complaintsResult, membersResult, managersResult] =
                    results;

                if (complaintsResult.status === "fulfilled") {
                    setComplaints(complaintsResult.value);
                }
                if (membersResult.status === "fulfilled") {
                    setMembers(membersResult.value);
                }
                if (managersResult.status === "fulfilled") {
                    setManagers(managersResult.value);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error("COMPLAINTS PAGE FETCH ERROR:", err);
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    const managerOnly = useMemo(
        () =>
            managers.filter((m) => {
                const roles = (m as { roles?: string[] }).roles ?? [];
                if (roles.length === 0) return true;
                return roles.some((r) => normalizeRoleKey(r) === "Manager");
            }),
        [managers]
    );

    return (
        <div className="w-full min-h-screen overflow-x-hidden relative m-0 p-0">
            <div
                className="relative min-h-screen pb-10"
                style={{ marginLeft: "-1rem", width: "calc(100% + 2rem)" }}
            >
                <img
                    src="/images/usersPageAdmin/Rectangle 675.png"
                    className="absolute pointer-events-none"
                    style={{
                        width: "calc(100% + 20px)",
                        height: "calc(100% + 40px)",
                        top: "-40px",
                        left: "-20px",
                        objectFit: "fill",
                    }}
                    alt=""
                />

                <div className="relative z-10 mt-24 px-10 pb-6 flex flex-col gap-6 box-border">
                    {accessLoading ? (
                        <p className="text-[16px] text-[#6B6B6B]">
                            Завантаження скарг...
                        </p>
                    ) : isAdmin ? (
                        <AdminComplaintsPanel
                            complaints={complaints}
                            members={members}
                            managers={managerOnly.length ? managerOnly : managers}
                            isLoading={isLoading}
                        />
                    ) : (
                        <ManagerComplaintsPanel
                            complaints={complaints}
                            members={members}
                            managers={managers}
                            isLoading={isLoading}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

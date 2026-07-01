"use client";

import { useEffect, useState } from "react";
import BlockForUsersInfo from "./section/BlockForUsersInfo";
import { useUsersStats } from "./hooks/useUsersStats";
import useAllUsersInfo, { UserInfo } from "./hooks/useAllUsersInfo";
import AllUsersInfo from "./section/AllUsersInfo";
import OneUserInfo from "./section/oneUserInfo/OneUserInfo";


export default function Page() {
    const { stats, loading } = useUsersStats();
    const { usersInfo, loadingUsersInfo } = useAllUsersInfo();
    const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
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
    useEffect(() => {
        if (!selectedUser && usersInfo.length > 0) {
            setSelectedUser(usersInfo[0]);
        }
    }, [usersInfo, selectedUser]);
    return (
        <div
            className="w-full min-h-screen overflow-hidden relative m-0 p-0">
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
                <div className="flex flex-row relative mt-2 mx-4 gap-4 items-start">
                    {loadingUsersInfo ? (
                        <p>Завантаження...</p>
                    ) : (
                        <AllUsersInfo
                            users={usersInfo}
                            onSelectUser={setSelectedUser}
                            selectedUserId={selectedUser?.id}
                        />
                    )}

                    {selectedUser && <OneUserInfo user={selectedUser} />}
                </div>
            </div>
        </div>
    );
}
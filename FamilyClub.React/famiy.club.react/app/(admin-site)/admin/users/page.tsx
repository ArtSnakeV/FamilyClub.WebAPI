"use client";

import { useEffect } from "react";
import BlockForUsersInfo from "./section/BlockForUsersInfo";

export default function Page() {
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
                <div className="flex flex-row relative items-center mt-24 ml-4">
                    <div>
                        <BlockForUsersInfo />
                    </div>
                    <div>
                        <BlockForUsersInfo />
                    </div>
                    <div>
                        <BlockForUsersInfo />
                    </div>
                    <div>
                        <BlockForUsersInfo />
                    </div>
                </div>
            </div>
        </div>
    );
}
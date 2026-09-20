"use client";

import PlatformSettingsPanel from "./components/PlatformSettingsPanel";

export default function PlatformSettingsPage() {
    return (
        <div className="w-full min-h-full overflow-x-clip relative m-0 p-0 text-[var(--foreground-primary)]">
            <div
                className="relative min-h-full pb-10"
                style={{ marginLeft: "-1rem", width: "calc(100% + 2rem)" }}
            >
                <div
                    className="absolute pointer-events-none overflow-hidden"
                    style={{
                        top: "-40px",
                        left: "-20px",
                        right: "-20px",
                        bottom: 0,
                    }}
                    aria-hidden
                >
                    <div className="admin-shelf-surface absolute inset-0">
                        <img
                            src="/images/usersPageAdmin/Rectangle 675.png"
                            className="absolute inset-0 w-full h-full object-cover object-bottom"
                            alt=""
                        />
                    </div>
                </div>

                <div className="relative z-10 mt-24 px-10 pb-6 flex flex-col gap-6 box-border">
                    <PlatformSettingsPanel />
                </div>
            </div>
        </div>
    );
}

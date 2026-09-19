"use client";

import MySettingsPanel from "./components/MySettingsPanel";

export default function MySettingsPage() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden relative m-0 p-0 text-[var(--foreground-primary)]">
      <div
        className="relative min-h-screen pb-10"
        style={{ marginLeft: "-1rem", width: "calc(100% + 2rem)" }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            width: "calc(100% + 20px)",
            top: "-40px",
            left: "-20px",
          }}
          aria-hidden
        >
          <div className="admin-shelf-surface relative w-full h-full min-h-screen">
            <img
              src="/images/usersPageAdmin/Rectangle 675.png"
              className="block w-full h-full object-fill min-h-screen"
              style={{ height: "calc(100% + 40px)" }}
              alt=""
            />
          </div>
        </div>

        <div className="relative z-10 mt-24 px-10 pb-6 flex flex-col gap-6 box-border">
          <MySettingsPanel />
        </div>
      </div>
    </div>
  );
}

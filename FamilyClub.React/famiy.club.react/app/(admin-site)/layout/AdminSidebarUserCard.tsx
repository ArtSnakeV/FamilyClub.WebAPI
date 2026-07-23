"use client";

import { useCurrentUser } from "@/app/(user-site)/userProfile/hooks/useCurrentUser";
import { usePlatformSettingsOptional } from "@/lib/platformSettings/PlatformSettingsContext";
import { mediaSrc } from "@/lib/platformSettings/platformSettingsApi";

export default function AdminSidebarUserCard() {
  const { user, loading } = useCurrentUser();
  const { settings } = usePlatformSettingsOptional();

  const logoSrc = mediaSrc(settings.logoData, settings.logoContentType);

  const avatarSrc = logoSrc
    ? logoSrc
    : user?.avatarData
      ? `data:image/jpeg;base64,${user.avatarData}`
      : null;

  const displayName =
    settings.companyName?.trim() ||
    [user?.name, user?.surname].filter(Boolean).join(" ") ||
    user?.email?.split("@")[0] ||
    "Ink & Echo";

  const displayRoles =
    user?.roles && user.roles.length > 0
      ? user.roles.join(", ")
      : "Не авторизований";

  return (
    <div className="flex items-center gap-3 mb-4">
      {!loading && avatarSrc ? (
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            backgroundColor: "#fff",
          }}
        >
          <img
            src={avatarSrc}
            alt="brand"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ) : (
        <div
          style={{
            width: "60px",
            height: "60px",
            backgroundImage:
              "url('/images/admin_manager_layout/cat_circle.svg')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            flexShrink: 0,
          }}
        />
      )}

      <div className="flex flex-col justify-center min-w-0">
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "150%",
            letterSpacing: "-1.1%",
            color: "var(--foreground-primary)",
          }}
          className="truncate"
          title={displayName}
        >
          {loading ? "Ink & Echo" : displayName}
        </div>

        {settings.slogan ? (
          <div
            className="truncate text-[13px] text-black/45"
            title={settings.slogan}
          >
            {settings.slogan}
          </div>
        ) : null}

        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "150%",
            letterSpacing: "-1.1%",
            color: "rgba(0,0,0,0.5)",
          }}
          className="truncate"
        >
          {loading ? "Адміністратор" : displayRoles}
        </div>
      </div>
    </div>
  );
}

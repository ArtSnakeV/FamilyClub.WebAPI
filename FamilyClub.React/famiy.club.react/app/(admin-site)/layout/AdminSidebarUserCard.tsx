"use client";

import { useCurrentUser } from "@/app/(user-site)/userProfile/hooks/useCurrentUser";

export default function AdminSidebarUserCard() {
  const { user, loading } = useCurrentUser();

  // Аватар: якщо є avatarData — base64 зображення, інакше fallback на cat_circle
  const avatarSrc = user?.avatarData
    ? `data:image/jpeg;base64,${user.avatarData}`
    : null;

  // Ім'я: name + surname або email або fallback
  const displayName =
    [user?.name, user?.surname].filter(Boolean).join(" ") ||
    user?.email?.split("@")[0] ||
    "Ink & Echo";

  // Ролі: масив рядків → через кому. Якщо немає — fallback
  const displayRoles =
    user?.roles && user.roles.length > 0
      ? user.roles.join(", ")
      : "Не авторизований";

  return (
    <div className="flex items-center gap-3 mb-4">
      {/* АВАТАР */}
      {!loading && avatarSrc ? (
        // Авторизований + є аватар → показуємо фото
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={avatarSrc}
            alt="avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ) : (
        // Не авторизований або нема аватара → cat_circle
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

      {/* ТЕКСТ */}
      <div className="flex flex-col justify-center">
        {/* Ім'я */}
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "150%",
            letterSpacing: "-1.1%",
            color: "var(--foreground-primary)",
            display: "flex",
            alignItems: "center",
          }}
        >
          {loading ? "Ink & Echo" : displayName}
        </div>

        {/* Ролі */}
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "150%",
            letterSpacing: "-1.1%",
            color: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
          }}
        >
          {loading ? "Адміністратор" : displayRoles}
        </div>
      </div>
    </div>
  );
}

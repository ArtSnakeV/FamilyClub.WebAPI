"use client";
import { useCurrentUser } from "@/app/(user-site)/userProfile/hooks/useCurrentUser";

export default function GreetingBanner() {
    const { user, loading } = useCurrentUser();

    const displayName =
    [user?.name, user?.surname].filter(Boolean).join(" ") ||
    user?.email?.split("@")[0] ||
    "Ink";
    
    return (
      <div className="relative w-fit h-fit px-8 py-6">
        {/* Changed object-cover to object-fill to prevent any border cropping */}
        <img
          src="/images/admin_manager/desktop/HeaderCardBackground.png"
          alt=""
          className="absolute inset-0 w-full h-full object-fill pointer-events-none"
          aria-hidden="true"
        />
  
        {/* Text content */}
        <div className="relative z-10 whitespace-nowrap">
          <h1 className="text-[32px] font-semibold text-[var(--foreground-primary)]">
            Доброго дня, {loading ? "Завантаження..." : displayName}!
          </h1>
          <p className="text-[16px] opacity-70 mt-1">
            Ось що відбувається на сайті
          </p>
        </div>
      </div>
    );
}
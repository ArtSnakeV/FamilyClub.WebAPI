"use client";
import { useCurrentUser } from "@/app/(user-site)/userProfile/hooks/useCurrentUser";

export default function GreetingBanner() {
    const { user, loading } = useCurrentUser();

    const displayName =
    [user?.name, user?.surname].filter(Boolean).join(" ") ||
    user?.email?.split("@")[0] ||
    "Ink";
    

    return (
      <div className="relative w-full px-8 py-6">
        {/* Background image */}
        <img
          src="/images/admin/desktop/HeaderCardBackground.png"
          alt=""
          className="absolute inset-0 max-w-[440px] h-full object-fill pointer-events-none"
          aria-hidden="true"
        />
  
        {/* Text on top */}
        <div className="relative z-10">
          <h1 className="text-[32px] font-semibold text-[var(--foreground-primary)]">
            Доброго дня, Ink!
          </h1>
          <p className="text-[16px] opacity-70 mt-1">
            Ось що відбувається на сайті
          </p>
        </div>
      </div>
    );
  }
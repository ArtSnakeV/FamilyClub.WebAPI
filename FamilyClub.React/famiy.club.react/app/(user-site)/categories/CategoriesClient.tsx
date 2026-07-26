"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MobileFiltersView from "./MobileFiltersView";

function CategoriesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile === false) {
      const queryString = searchParams?.toString();
      router.replace(`/products${queryString ? `?${queryString}` : ""}`);
    }
  }, [isMobile, router, searchParams]);

  if (isMobile === null) {
    return <div className="min-h-screen bg-[#c7a381]" />;
  }

  if (!isMobile) {
    return (
      <div className="min-h-screen bg-[var(--background-main)] pt-[200px] pb-12 flex justify-center items-center">
        <p className="text-gray-600 font-mono">Перенаправлення в каталог...</p>
      </div>
    );
  }

  return <MobileFiltersView />;
}

export default function CategoriesClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#c7a381]" />}>
      <CategoriesContent />
    </Suspense>
  );
}

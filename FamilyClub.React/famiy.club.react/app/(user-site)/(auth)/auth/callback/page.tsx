"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { setAuthSession } from "@/lib/auth/tokenStorage";
import Link from "next/link";

function AuthCallbackContent() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Token is in hash fragment (not query) so it is not logged by servers / proxies.
    const hash = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
    const params = new URLSearchParams(hash);
    const token = params.get("token");
    const userId = params.get("userId") ?? undefined;
    const err = params.get("error");

    if (err) {
      setError(decodeURIComponent(err));
      return;
    }

    if (token) {
      setAuthSession(token, userId, true);
      window.dispatchEvent(new Event("auth-change"));
      // Clear hash so token is not left in history bar longer than needed.
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", window.location.pathname);
      }
      router.push("/");
    } else {
      setError("Помилка авторизації: Токен відсутній.");
    }
  }, [router]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 font-sans text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md w-full shadow-sm">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Помилка авторизації</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <Link
            href="/login"
            className="inline-block bg-[var(--color-green)] text-white font-medium px-6 py-3 rounded-lg hover:brightness-110 transition shadow-md"
          >
            Повернутися до входу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] font-sans">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-green)] mb-4"></div>
      <p className="text-lg text-gray-700">Виконується авторизація, зачекайте...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[60vh] font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-green)] mb-4"></div>
        <p className="text-lg text-gray-700">Завантаження...</p>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}

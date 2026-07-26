import { Suspense } from "react";
import CatalogClient from "./CatalogClient";

/** Products load on the client via /api rewrite — avoids SSR TLS issues with localhost. */
export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[var(--background-main)] pt-[200px] flex justify-center">
          <p className="font-mono text-[#6B6B6B]">Завантаження каталогу...</p>
        </div>
      }
    >
      <CatalogClient />
    </Suspense>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RolesNav() {
    const pathname = usePathname();
    const isMatrix = pathname === "/admin/roles";
    const isActions =
        pathname === "/admin/roles/role-actions" ||
        pathname.startsWith("/admin/roles/role-actions/");

    const linkClass = (active: boolean) =>
        `
        font-['Source_Sans_Pro'] font-normal text-[20px] leading-[125%] tracking-[-0.011em] align-middle no-underline
        px-5 py-2.5 rounded-[9px]
        hover:text-[var(--foreground-on-dark)] hover:bg-[var(--color-brand-green)]
        transition-colors duration-200 ease-in-out
        ${
            active
                ? "text-[var(--foreground-on-dark)] bg-[var(--color-brand-green)]"
                : "text-[var(--foreground-primary)] bg-transparent"
        }
        `;

    return (
        <div
            className="w-screen relative left-1/2 -translate-x-1/2 bg-center bg-no-repeat py-8 flex justify-center items-center gap-5"
            style={{
                backgroundImage: "url('/images/entities/books/top_frame.svg')",
                backgroundSize: "125% 125%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Link href="/admin/roles" className={linkClass(isMatrix)}>
                Матриця доступів
            </Link>
            <Link href="/admin/roles/role-actions" className={linkClass(isActions)}>
                Керування ролями
            </Link>
        </div>
    );
}

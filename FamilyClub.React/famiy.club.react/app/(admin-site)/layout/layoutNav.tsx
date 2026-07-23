"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../../../styles/adminLayoutStyles.module.css";
import { useAccessControl } from "@/lib/auth/useAccessControl";

export default function AdminLayoutSidebarItems() {
    const pathname = usePathname();
    const { loading, allowedSidebarItems } = useAccessControl();

    if (loading) {
        return (
            <div className="relative w-full flex flex-col gap-[5px] px-2 py-4 text-[14px] opacity-70">
                Завантаження меню...
            </div>
        );
    }

    return (
        <div className="relative w-full flex flex-col gap-[5px] overflow-visible">
            {allowedSidebarItems.map((item) => {
                const active = item.match(pathname);
                return (
                    <div key={item.href} className="pb-[0px] last:pb-0">
                        <Link
                            href={item.href}
                            className={`${styles.customTabLink} ${
                                active ? styles.active : ""
                            }`}
                        >
                            <div className={styles.shapeContainer}>
                                <div className="relative w-[32px] h-[32px] flex-shrink-0">
                                    <Image
                                        src={item.icon}
                                        alt=""
                                        fill
                                        className={`${styles.icon} object-contain`}
                                    />
                                </div>
                                <span className={styles.linkText}>
                                    {item.label}
                                </span>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

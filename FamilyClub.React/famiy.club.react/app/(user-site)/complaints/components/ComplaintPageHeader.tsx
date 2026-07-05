"use client";

import { useRouter } from "next/navigation";
import styles from "../complaints.module.css";

export default function ComplaintPageHeader() {
  const router = useRouter();

  return (
    <div className={styles.headerRow}>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => router.back()}
        title="Назад"
        aria-label="Назад"
      >
        ←
      </button>
      <h1 className={styles.title}>
        Подати <span className={styles.highlight}>скаргу</span>
      </h1>
    </div>
  );
}

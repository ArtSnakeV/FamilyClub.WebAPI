"use client";

import styles from "../complaints.module.css";

type Props = {
  publisherName?: string | null;
  positivePercent?: number;
};

export default function PublisherBanner({
  publisherName,
  positivePercent = 88,
}: Props) {
  const name = publisherName ?? "Видавництво «Книгарня»";

  return (
    <div className={styles.publisherBanner}>
      <img
        src="/images/header/logo.png"
        alt=""
        className={styles.publisherLogo}
      />
      <div>
        <div className={styles.publisherName}>{name}</div>
        <div className={styles.publisherMeta}>
          {positivePercent}% позитивних відгуків
        </div>
      </div>
    </div>
  );
}

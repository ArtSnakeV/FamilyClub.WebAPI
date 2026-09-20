export default function StatusBadge({ approved }: { approved: boolean }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        approved
          ? "bg-[color-mix(in_srgb,var(--color-green)_18%,var(--background-elevated))] text-[var(--color-green)]"
          : "bg-[color-mix(in_srgb,#C9A227_20%,var(--background-elevated))] text-[#C9A227]"
      }`}
    >
      {approved ? "Опубліковано" : "На модерації"}
    </span>
  );
}

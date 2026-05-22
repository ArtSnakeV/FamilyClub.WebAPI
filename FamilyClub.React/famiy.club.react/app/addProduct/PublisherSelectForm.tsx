import type { PublisherDto } from "@/lib/api/generated";

type Props = {
  publishers: PublisherDto[];
  value?: number;
  onChange: (id?: number) => void;
};

export default function PublisherSelectForm({ publishers, value, onChange }: Props) {
  return (
    <>
      <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
        Видавництво *
      </p>
      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : undefined)
        }
        className="input rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
      >
        <option value="">Оберіть видавництво</option>
        {publishers.map((p) => (
          <option key={p.id} value={p.id}>
            {p.publisherName}
          </option>
        ))}
      </select>
    </>
  );
}

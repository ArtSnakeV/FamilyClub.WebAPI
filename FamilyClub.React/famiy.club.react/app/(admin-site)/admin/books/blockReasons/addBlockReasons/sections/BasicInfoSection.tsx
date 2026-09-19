import { BlockReasonDto } from "../types";
import { SectionCard } from "../ui/SectionCard";

type Props = {
  form: BlockReasonDto;
  setField: <K extends keyof BlockReasonDto>(
    key: K,
    value: BlockReasonDto[K],
  ) => void;
  loading: boolean;
};

export function BasicInfoSection({ form, setField, loading }: Props) {
  return (
    <div className="w-full flex">
      <SectionCard
        title="Основна інформація"
        backgroundImage="/images/addProducts/Rectangle 314.png"
        className="bg-contain h-full"
        backgroundSize="100% 100%"
      >
        <div className="flex w-[560px]  flex-col gap-1">
          <p className="text-[var(--foreground-primary)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
            Назва причини блокування *
          </p>
          <input
            placeholder="Назва причини блокування"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            className="input rounded-[9px] px-3 bg-[var(--background-elevated)] text-[var(--foreground-primary)] shadow-[var(--shadow-input)] border border-[color-mix(in_srgb,var(--foreground-primary)_14%,transparent)] outline-none h-[44px]"
          />

          <p className="text-[var(--foreground-primary)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em] mt-4">
            Опис
          </p>
          <textarea
            placeholder="Опис причини блокування (необов'язково)"
            value={form.description ?? ""}
            onChange={(e) => setField("description", e.target.value || null)}
            rows={4}
            className="input rounded-[9px] px-3 py-2 bg-[var(--background-elevated)] text-[var(--foreground-primary)] shadow-[var(--shadow-input)] border border-[color-mix(in_srgb,var(--foreground-primary)_14%,transparent)] outline-none resize-none"
          />

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[60px] rounded-[55px] bg-[var(--color-green)] text-[var(--color-cream)] text-[20px] font-medium transition-all duration-200 hover:opacity-90 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Збереження..." : "Додати причину блокування"}
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
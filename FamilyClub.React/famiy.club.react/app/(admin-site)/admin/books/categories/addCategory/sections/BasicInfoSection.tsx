import { CategoryDto } from "../types";
import { SectionCard } from "../ui/SectionCard";

type Props = {
  form: CategoryDto;
  setField: <K extends keyof CategoryDto>(
    key: K,
    value: CategoryDto[K],
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
        <div className="flex w-[560px] flex-col gap-1">
          <p className="text-[var(--foreground-primary)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
            Назва категорії *
          </p>
          <input
            placeholder="Назва категорії"
            value={form.categoryName}
            onChange={(e) => setField("categoryName", e.target.value)}
            className="input rounded-[9px] px-3 bg-[var(--background-elevated)] text-[var(--foreground-primary)] shadow-[var(--shadow-input)] border border-[color-mix(in_srgb,var(--foreground-primary)_14%,transparent)] outline-none h-[44px]"
          />

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[60px] rounded-[55px] bg-[var(--color-green)] text-[var(--color-cream)] text-[20px] font-medium transition-all duration-200 hover:opacity-90 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Збереження..." : "Додати категорію"}
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

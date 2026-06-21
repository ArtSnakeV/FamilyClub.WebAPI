import { LanguageDto } from "../types";
import { SectionCard } from "../ui/SectionCard";

type Props = {
  form: LanguageDto;
  setField: <K extends keyof LanguageDto>(
    key: K,
    value: LanguageDto[K],
  ) => void;
  loading: boolean;
};

export function BasicInfoSection({ form, setField, loading }: Props) {
  return (
    <div className="w-full flex">
      <SectionCard
        title="Основна інформація"
        backgroundImage="/images/addProducts/Rectangle 314.svg"
        className="bg-contain h-full"
      >
        <div className="flex w-[560px] flex-col gap-1">
          <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
            Назва мови *
          </p>
          <input
            placeholder="Назва мови"
            value={form.languageName}
            onChange={(e) => setField("languageName", e.target.value)}
            className="input rounded-[9px] px-3 bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
          />

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[60px] rounded-[55px] bg-[var(--color-green)] text-[var(--color-white)] text-[20px] font-medium transition-all duration-200 hover:opacity-90 hover:shadow-[0px_0px_20px_0px_#00000080] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Збереження..." : "Додати мову"}
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

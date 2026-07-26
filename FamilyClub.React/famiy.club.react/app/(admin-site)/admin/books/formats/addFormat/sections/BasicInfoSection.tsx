import { FormatFormDto } from "../types";
import { SectionCard } from "@/app/(admin-site)/admin/books/languages/addLanguage/ui/SectionCard";

type Props = {
  form: FormatFormDto;
  setField: <K extends keyof FormatFormDto>(
    key: K,
    value: FormatFormDto[K]
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
        <div className="flex w-[560px] flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
              Назва формату *
            </p>
            <input
              placeholder="Наприклад: Паперова"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className="input rounded-[9px] px-3 bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
              Код формату *
            </p>
            <input
              placeholder="Наприклад: paperback"
              value={form.code}
              onChange={(e) => setField("code", e.target.value)}
              className="input rounded-[9px] px-3 bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[60px] rounded-[55px] bg-[var(--color-green)] text-[var(--color-white)] text-[20px] font-medium transition-all duration-200 hover:opacity-90 hover:shadow-[0px_0px_20px_0px_#00000080] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Збереження..." : "Додати формат"}
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

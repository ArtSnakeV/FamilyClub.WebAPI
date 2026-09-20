import { FormatFormDto } from "@/app/(admin-site)/admin/books/formats/addFormat/types";
import { SectionCard } from "@/app/(admin-site)/admin/books/languages/addLanguage/ui/SectionCard";

type Props = {
  form: FormatFormDto;
  setField: <K extends keyof FormatFormDto>(
    key: K,
    value: FormatFormDto[K]
  ) => void;
  loading: boolean;
  handleDelete: () => void;
};

export function BasicInfoSectionEditFormat({
  form,
  setField,
  loading,
  handleDelete,
}: Props) {
  return (
    <div className="w-full flex pb-4">
      <SectionCard
        title="Основна інформація"
        backgroundImage="/images/addProducts/Rectangle 313.svg"
        className="w-[600px] h-[580px]"
        backgroundSize="100% 100%"
      >
        <div className="flex w-[390px] relative top-[46px] flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[var(--foreground-primary)] font-sans-pro font-normal text-[18px] leading-[150%] tracking-[-0.011em]">
              Назва формату *
            </p>
            <input
              placeholder="Назва формату"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className="input rounded-[9px] px-3 bg-[var(--background-elevated)] text-[var(--foreground-primary)] shadow-[var(--shadow-input)] border border-[color-mix(in_srgb,var(--foreground-primary)_14%,transparent)] outline-none h-[44px]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-[var(--foreground-primary)] font-sans-pro font-normal text-[18px] leading-[150%] tracking-[-0.011em]">
              Код формату *
            </p>
            <input
              placeholder="Код формату"
              value={form.code}
              onChange={(e) => setField("code", e.target.value)}
              className="input rounded-[9px] px-3 bg-[var(--background-elevated)] text-[var(--foreground-primary)] shadow-[var(--shadow-input)] border border-[color-mix(in_srgb,var(--foreground-primary)_14%,transparent)] outline-none h-[44px]"
            />
          </div>

          <div className="p-4 top-[24px] relative w-full flex flex-col gap-5">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[40px] rounded-[55px] bg-[var(--color-green)] text-[var(--color-cream)] text-[20px] font-medium transition-all duration-200 hover:opacity-90 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Збереження..." : "Зберегти зміни"}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleDelete}
              className="w-full h-[40px] rounded-[55px] bg-transparent text-[var(--color-green)] border-2 border-[var(--color-green)] text-[20px] font-medium transition-all duration-200 hover:opacity-90 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Видалення..." : "Видалити"}
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

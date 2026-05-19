import type { LanguageDto } from "@/lib/api/generated";

type Props = {
  languages: LanguageDto[];
  value?: number;
  onChange: (id?: number) => void;
};

export default function LanguageSelectForm({ languages, value, onChange }: Props) {
  return (
    <>
      <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
        Мова *
      </p>
      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : undefined)
        }
        className="input rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
      >
        <option value="">Оберіть мову</option>

        {languages.map((l) => (
          <option key={l.id} value={l.id}>
            {l.languageName}
          </option>
        ))}
      </select>
    </>
  );
}

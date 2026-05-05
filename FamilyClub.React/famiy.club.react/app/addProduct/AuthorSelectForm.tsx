import type { AuthorDTO } from "@/lib/api/generated";

type Props = {
  authors: AuthorDTO[];
  value?: number;
  onChange: (id?: number) => void;
};

export default function AuthorSelectForm({ authors, value, onChange }: Props) {
  return (
    <>
      <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
        Автор(и) *
      </p>
      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : undefined)
        }
        className="input rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
      >
        <option value="">Оберіть автора</option>

        {authors.map((a) => (
          <option key={a.id} value={a.id}>
            {a.authorName}
          </option>
        ))}
      </select>
    </>
  );
}

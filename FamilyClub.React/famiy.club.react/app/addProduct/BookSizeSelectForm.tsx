const bookSizeOptions  = [
  { label: "A5 (148 x 210 мм)", value: "A5" },
  { label: "A4 (210 x 297 мм)", value: "A4" },
  { label: "B5 (176 x 250 мм)", value: "B5" },
];

type Props = {
  value?: string;
  onChange: (value?: string) => void;
};

export default function BookSizeSelectForm({ value, onChange }: Props) {
  return (
    <>
      <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
        Друкований формат
      </p>
      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? e.target.value : undefined)
        }
        className="input rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
      >
        <option value="">Оберіть друкований формат</option>

        {bookSizeOptions.map((size) => (
          <option key={size.value} value={size.value}>
            {size.label}
          </option>
        ))}
      </select>
    </>
  );
}

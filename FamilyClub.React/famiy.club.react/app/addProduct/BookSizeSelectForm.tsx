import { BookSize } from "@/lib/api/generated";

const bookSizeOptions = [
  { label: "A4 (210 x 297 мм)", value: BookSize.NUMBER_0 },
  { label: "A5 (148 x 210 мм)", value: BookSize.NUMBER_1 },
  { label: "B5 (176 x 250 мм)", value: BookSize.NUMBER_2 },
  { label: "Custom", value: BookSize.NUMBER_3 },
];

type Props = {
  value?: BookSize;
  onChange: (value: BookSize) => void;
};

export default function BookSizeSelectForm({ value, onChange }: Props) {
  return (
    <>
      <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
        Друкований формат
      </p>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(Number(e.target.value) as BookSize)}
        className={`input rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]`}
      >
        <option value="" className="text-gray-400">
          Оберіть друкований формат
        </option>
        {bookSizeOptions.map((size) => (
          <option
            key={size.value}
            value={size.value}
            className="text-[var(--color-black)]"
          >
            {size.label}
          </option>
        ))}
      </select>
    </>
  );
}

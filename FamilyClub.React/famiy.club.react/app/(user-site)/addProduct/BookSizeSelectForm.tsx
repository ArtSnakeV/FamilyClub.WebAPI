import { BookSizeDto } from "@/lib/api/generated";

type Props = {
  formats: BookSizeDto[];
  value?: number;
  onChange: (id?: number) => void;
};

export default function BookSizeSelectForm({
  value,
  onChange,
  formats,
}: Props) {
  return (
    <div className="flex flex-col gap-0 w-full">
      <p className="text-[var(--color-black)] font-sans-pro font-normal text-[18px] leading-[150%] tracking-[-0.011em]">
        Друкований формат
      </p>
      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : undefined)
        }
        className={`input rounded-[9px] text-[12.5px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[40px]`}
      >
        <option value="" className="text-gray-400">
          Оберіть друкований формат
        </option>
        {formats.map((size) => (
          <option
            key={size.id}
            value={size.id}
            className="text-[var(--color-black)]"
          >
            {size.name}
          </option>
        ))}
      </select>
    </div>
  );
}

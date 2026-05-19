import { CoverType } from "@/src/lib/api/generated";

const coverTypeOptions = [
  { label: "Тверда", value: CoverType.NUMBER_0 },
  { label: "М'яка", value: CoverType.NUMBER_1},
];

type Props = {
  value: CoverType;
  onChange: (value: CoverType) => void;
};

export default function CoverTypeSelect({ value, onChange }: Props) {
  return (
    <div>
      <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px]">
        Тип обкладинки
      </p>

      <div className="flex flex-row justify-around gap-2 mt-2">
        {coverTypeOptions.map((cover) => (
          <label key={cover.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="coverType"
              checked={value === cover.value}
              onChange={() => onChange(cover.value)}
              className="accent-black"
            />
            <span>{cover.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
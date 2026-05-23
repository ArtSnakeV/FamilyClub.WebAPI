type Props = {
  value: "hard" | "soft";
  onChange: (value: "hard" | "soft") => void;
};
const coverTypeOptions = [
  { value: "hard" as const, label: "Тверда" },
  { value: "soft" as const, label: "М'яка" },
];

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
import { AgeRestriction } from "@/lib/api/generated";

const ageRestrictions = [
  { label: "0+", value: AgeRestriction.NUMBER_0 },
  { label: "6+", value: AgeRestriction.NUMBER_1 },
  { label: "12+", value: AgeRestriction.NUMBER_2 },
  { label: "16+", value: AgeRestriction.NUMBER_3 },
  { label: "18+", value: AgeRestriction.NUMBER_4 },
];

type Props = {
  value?: AgeRestriction;
  onChange: (value: AgeRestriction) => void;
};

export default function AgeRestrictions({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
        Вікові обмеження *
      </p>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(Number(e.target.value) as AgeRestriction)}
        className="input rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
      >
        <option value="">Оберіть вікові обмеження</option>

        {ageRestrictions.map((age) => (
          <option key={age.value} value={age.value}>
            {age.label}
          </option>
        ))}
      </select>
    </div>
  );
}

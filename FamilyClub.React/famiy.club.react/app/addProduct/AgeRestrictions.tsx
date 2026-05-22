const ageRestrictions = [
  { label: "Без обмежень", value: "0" },
  { label: "6+", value: "6" },
  { label: "12+", value: "12" },
  { label: "16+", value: "16" },
  { label: "18+", value: "18" },
];

type Props = {
  value?: string;
  onChange: (value?: string) => void;
};

export default function AgeRestrictions({ value, onChange }: Props) {
  return (
    <>
      <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
        Вікові обмеження *
      </p>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || undefined)}
        className="input rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
      >
        <option value="">Оберіть вікові обмеження</option>

        {ageRestrictions.map((age) => (
          <option key={age.value} value={age.value}>
            {age.label}
          </option>
        ))}
      </select>
    </>
  );
}

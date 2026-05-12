const conditionOfTheGoods = [
  { label: "В наявності", value: "1" },
  { label: "Немає", value: "2" },
  { label: "Передзамовлення", value: "3" },
];

type Props = {
  value?: string;
  onChange: (value?: string) => void;
};

export default function ConditionOfTheGoods({ value, onChange }: Props) {
  return (
    <div className="w-[640px] m-2 p-2 flex flex-col gap-2 items-center">
      <ul className="flex flex-col items-center w-full gap-2">
        {conditionOfTheGoods.map((condition) => {
          const isSelected = value === condition.value;

          return (
            <li
              key={condition.value}
              onClick={() => onChange(condition.value)}
              className={`inline-block w-fit
            px-6 py-4 rounded-full cursor-pointer
            font-['Source_Sans_Pro'] font-normal text-[24px] leading-[100%]
            transition-all duration-200 border

            ${
              isSelected
                ? "border-[1px] border-[#242424] text-[#242424]"
                : "border-transparent text-[#242424] hover:border-gray-400 hover:bg-gray-100"
            }
          `}
            >
              {condition.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

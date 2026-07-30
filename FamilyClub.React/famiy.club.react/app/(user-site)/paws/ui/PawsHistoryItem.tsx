import Image from "next/image";
import type { PawsHistoryItem as PawsHistoryItemType } from "../hooks/usePaws";

type Props = {
  item: PawsHistoryItemType;
};

export default function PawsHistoryItem({ item }: Props) {
  return (
    <li className="flex items-center justify-between py-3">
      <div>
        <p className="text-[13px] text-black">{item.title}</p>
        <p className="text-[11px] text-black/50">{item.date}</p>
      </div>
      <span
        className="text-[14px] font-semibold flex items-center gap-1"
        style={{ color: item.amount > 0 ? "#1F7A3D" : "#B03A2E" }}
      >
        {item.amount > 0 ? "+" : ""}
        {item.amount}
        <Image src="/images/userProfile/Лапка.png" width={14} height={11} alt="paws" />
      </span>
    </li>
  );
}
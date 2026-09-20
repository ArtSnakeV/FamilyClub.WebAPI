import Image from "next/image";
import type { PawsHistoryItem as PawsHistoryItemType } from "../hooks/usePaws";

type Props = {
  item: PawsHistoryItemType;
  night?: boolean;
};

export default function PawsHistoryItem({ item, night = false }: Props) {
  const ink = night ? "var(--color-cream)" : "var(--color-black)";
  return (
    <li className="flex items-center justify-between py-3 gap-4">
      <div>
        <p className="text-[20px]" style={{ color: ink }}>
          {item.title}
        </p>
        <p className="text-[15px]" style={{ color: ink, opacity: night ? 0.75 : 1 }}>
          {item.date}
        </p>
      </div>
      <div className="flex flex-row gap-4">
        <span
          className="text-[32px] font-semibold flex items-center gap-1"
          style={{ color: item.amount > 0 ? ink : "#B03A2E" }}
        >
          {item.amount > 0 ? "+" : ""}
          {item.amount}
        </span>
        <Image src="/images/userProfile/Лапка.png" width={36} height={22} alt="paws" />
      </div>
    </li>
  );
}

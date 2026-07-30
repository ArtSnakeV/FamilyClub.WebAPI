import type { PawsHistoryItem as PawsHistoryItemType } from "../hooks/usePaws";
import PawsHistoryItem from "../ui/PawsHistoryItem";

type Props = {
  history: PawsHistoryItemType[];
};

export default function PawsHistoryBlock({ history }: Props) {
  return (
    <div className="rounded-3xl p-6 bg-white">
      <span
        className="inline-block px-4 py-1 rounded-full text-white text-[13px] font-semibold mb-4"
        style={{ backgroundColor: "#1F3D2B" }}
      >
        Історія лапок
      </span>
      <ul className="divide-y divide-black/5">
        {history.map((item) => (
          <PawsHistoryItem key={item.id} item={item} />
        ))}
      </ul>
      <button
        className="w-full mt-4 py-3 rounded-full text-white text-[14px] font-semibold"
        style={{ backgroundColor: "#1F3D2B" }}
      >
        Показати всю історію
      </button>
    </div>
  );
}
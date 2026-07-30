"use client";

import Link from "next/link";
import YourPawsBlock from "./components/YourPawsBlock";
import NextLevelBlock from "./components/NextLevelBlock";
import HowToEarnBlock from "./components/HowToEarnBlock";
import PawsHistoryBlock from "./components/PawsHistoryBlock";
import { usePaws } from "./hooks/usePaws";
import ButtonReturn from "../userProfile/editUserProfile/[id]/ui/ButtonReturn";

export default function MyPawsPage() {
  const { paws, history, discountInUah } = usePaws();

  return (
    <div className="min-h-screen px-10 py-8" style={{ backgroundColor: "#B98F6A" }}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-10 h-10 flex items-center justify-center">
            <ButtonReturn />
          </Link>
          <div>
            <h1 className="text-[26px] font-bold text-black">Мої лапки</h1>
            <p className="text-[13px] text-black/70">
              Отримуй та використовуй лапки для вигідних покупок
            </p>
          </div>
        </div>
        <Link
          href="/catalog"
          className="px-5 py-2 rounded-full text-white text-[14px] font-semibold"
          style={{ backgroundColor: "#1F3D2B" }}
        >
          Каталог
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <YourPawsBlock paws={paws} discountInUah={discountInUah} />
        <NextLevelBlock paws={paws} />
        <HowToEarnBlock />
        <PawsHistoryBlock history={history} />
      </div>
    </div>
  );
}
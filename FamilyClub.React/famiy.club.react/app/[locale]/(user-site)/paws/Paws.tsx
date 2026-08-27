import { usePaws } from "@/app/(user-site)/paws/hooks/usePaws";
import Image from "next/image";

export default function Paws({ userId }: { userId?: string }) {
  const { paws, discountInUah } = usePaws(userId);

  return (
    <div className="w-[240px] items-center justify-center gap-2 flex flex-row h-[42px] bg-[#A97E56] rounded-[25px]">
      <Image src="/images/userProfile/Лапка.png" width={36} height={26} alt="paws" />
      <p className="text-[13px]">Лапок: {paws}</p>
      <Image src="/images/userProfile/trending_flat_24px.png" width={20} height={20} alt="tr" />
      <p className="text-[13px]">Знижка: {discountInUah} грн</p>
    </div>
  );
}
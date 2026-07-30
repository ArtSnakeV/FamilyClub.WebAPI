import Image from "next/image";

type Props = {
  paws: number;
  discountInUah: number;
};

export default function YourPawsBlock({ paws, discountInUah }: Props) {
  return (
    <div className="rounded-3xl p-6 relative" style={{ backgroundColor: "#C9A47C" }}>
      <span
        className="inline-block px-4 py-1 rounded-full text-white text-[13px] font-semibold mb-4"
        style={{ backgroundColor: "#1F3D2B" }}
      >
        Ваші лапки
      </span>
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#1F3D2B" }}
        >
          <Image src="/images/userProfile/Лапка.png" width={36} height={26} alt="paws" />
        </div>
        <div>
          <p className="text-[36px] font-bold leading-none text-black">{paws}</p>
          <p className="text-[13px] text-black/70">лапок</p>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-black/10 text-[12px] text-black/60">
        100 Лапок = {discountInUah > 0 ? "10 грн" : "10 грн"}
      </div>
    </div>
  );
}
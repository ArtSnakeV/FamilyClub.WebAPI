import Image from "next/image";

const LEVEL_MAX = 300;

type Props = {
  paws: number;
};

export default function NextLevelBlock({ paws }: Props) {
  const progressPercent = Math.min(100, (paws / LEVEL_MAX) * 100);

  return (
    <div className="rounded-3xl p-6 bg-white">
      <p className="text-[13px] font-semibold mb-3 text-black flex items-center gap-1">
        До наступного рівня
        <Image
          src="/images/userProfile/circle-info-solid-full 1.png"
          width={15}
          height={15}
          alt="info"
        />
      </p>
      <div className="flex items-center gap-3">
        <span className="text-[12px] text-black/60 whitespace-nowrap flex items-center gap-1">
          <Image src="/images/userProfile/Лапка.png" width={20} height={15} alt="paws" />
          Рівень 1<br />0 Лапок
        </span>
        <div className="flex-1 h-2 rounded-full bg-[#EDE7DD] overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${progressPercent}%`, backgroundColor: "#1F3D2B" }}
          />
        </div>
        <span className="text-[12px] text-black/60 whitespace-nowrap text-right flex items-center gap-1">
          <Image src="/images/userProfile/Лапка.png" width={20} height={15} alt="paws" />
          Рівень 2<br />{LEVEL_MAX} Лапок
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-5">
        <button className="rounded-2xl border border-black/10 p-3 flex items-center gap-2 text-left">
          <Image src="/images/userProfile/gift-solid-full.png" width={24} height={24} alt="gift" />
          <span className="text-[12px] leading-tight">
            Обміняти на лапки
            <br />
            <span className="text-black/50">Перетвори лапки на знижку для покупки</span>
          </span>
        </button>
        <button className="rounded-2xl border border-black/10 p-3 flex items-center gap-2 text-left">
          <Image src="/images/userProfile/Tags.png" width={24} height={24} alt="tag" />
          <span className="text-[12px] leading-tight">
            Застосувати до покупки
            <br />
            <span className="text-black/50">Оплачуй до 30% вартості книги лапками</span>
          </span>
        </button>
      </div>

      <div className="mt-3 rounded-2xl bg-[#F5F3EE] p-3 text-[12px] text-black/70 space-y-1">
        <p>• Перетворити лапки в знижку можна при оформленні замовлення.</p>
        <p>• Лапки знімуться після покупки.</p>
      </div>
    </div>
  );
}
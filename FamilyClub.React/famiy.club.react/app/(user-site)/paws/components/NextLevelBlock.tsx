import Image from "next/image";

const LEVEL_MAX = 300;

type Props = {
  paws: number;
};

export default function NextLevelBlock({ paws }: Props) {
  const progressPercent = Math.min(100, (paws / LEVEL_MAX) * 100);

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Прогрес до наступного рівня */}
      <div
        className="relative px-5 py-4"
        style={{
          backgroundImage: "url('/images/pawsUser/Rectangle 510.png')",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="flex items-center gap-2 text-[14px] font-semibold mb-3">
          До наступного рівня
          <Image src="/images/userProfile/circle-info-solid-full 1.png" width={15} height={15} alt="" />
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex flex-col items-center shrink-0 w-[60px]">
            <Image src="/images/userProfile/Лапка.png" width={30} height={30} alt="" />
            <span className="text-xs mt-1">Рівень 1</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between text-xs text-black/60 mb-1">
              <span>{paws} лапок</span>
              <span>{LEVEL_MAX} лапок</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#F5F0E7" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${progressPercent}%`, backgroundColor: "#006C45" }}
              />
            </div>
          </div>

          <div className="flex flex-col items-center shrink-0 w-[70px]">
            <Image src="/images/userProfile/Лапка.png" width={30} height={30} alt="" />
            <span className="text-xs mt-1">Рівень 2</span>
            <span className="text-xs font-semibold whitespace-nowrap">+100 Лапок</span>
          </div>
        </div>
      </div>

      {/* Дві картки */}
      <div className="flex w-full flex-row gap-1 items-center -mt-4">
        <button
          className="relative flex-1 flex items-center gap-2 bg-cover w-[340px] h-[142px] p-2 text-left overflow-hidden"
          style={{
            backgroundImage: "url('/images/pawsUser/Rectangle 471.png')",
            backgroundSize: "cover",
            width: "340px",
            height: "142px"
          }}
        >
          <Image
            src="/images/userProfile/gift-solid-full.png"
            width={50}
            height={50}
            alt=""
            className="ml-5"
          />
          <div>
            <p className="font-bold text-[14px] leading-tight">
              Обміняти на лапки
            </p>
            <p className="text-black/60 text-xs w-[150px] mt-1.5 leading-snug">
              Перетвори лапки на знижку для покупки
            </p>
          </div>
        </button>

        <button
          className="relative flex-1 flex items-center gap-2 bg-cover w-[340px] h-[142px] p-2 text-left overflow-hidden"
          style={{
            backgroundImage: "url('/images/pawsUser/Rectangle 471.png')",
            backgroundSize: "cover",
            width: "340px",
            height: "142px"
          }}
        >
          <Image
            src="/images/userProfile/Tags.png"
            width={50}
            height={50}
            alt=""
            className="ml-5"
          />
          <div>
            <p className="font-bold text-[14px] leading-tight">
              Застосувати до покупки
            </p>
            <p className="text-black/60 text-xs w-[150px] mt-1.5 leading-snug">
              Оплачуй до 50% вартість книги лапками
            </p>
          </div>
        </button>
      </div>

      {/* Нижній блок */}
      <div
        className="relative w-[560px] h-[152px] -mt-8 bg-cover p-2 sm:p-5 text-[15px] sm:text-[16px]"
        style={{
          backgroundImage: "url('/images/pawsUser/Rectangle 471.svg')",
          backgroundSize: "cover",
          width: "560px",
          height: "152px"
        }}
      >
        <ul className="relative mt-5 space-y-4 sm:space-y-6 list-disc pl-8">
          <li>Перетворити лапки в знижку можна при оформленні замовлення.</li>
          <li>Лапки знімуться після покупки.</li>
        </ul>
      </div>
    </div>
  );
}
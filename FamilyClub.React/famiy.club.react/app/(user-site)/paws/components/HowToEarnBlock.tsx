import HowToEarnItem from "../ui/HowToEarnItem";

const howToEarn = [
  { icon: "/images/userProfile/cart-shopping-solid-full.png", title: "Покупка книг", desc: "+5% від суми покупки" },
  { icon: "/images/userProfile/comment-solid-full.png", title: "Залиш відгук", desc: "+10 лапок за кожен відгук" },
  { icon: "/images/userProfile/heart-solid-full.png", title: "Додай книгу в улюблене", desc: "+5% від суми покупки" },
  { icon: "/images/userProfile/cake-candles-solid-full.png", title: "День народження", desc: "+100 лапок" },
  { icon: "/images/userProfile/bolt-solid-full.png", title: "Активність на сайті", desc: "+1 лапка за день активності" },
];

export default function HowToEarnBlock() {
  return (
    <div className="rounded-3xl p-6" style={{ backgroundColor: "#C9A47C" }}>
      <span
        className="inline-block px-4 py-1 rounded-full text-white text-[13px] font-semibold mb-4"
        style={{ backgroundColor: "#1F3D2B" }}
      >
        Як отримати лапки?
      </span>
      <ul className="space-y-3 mt-2">
        {howToEarn.map((item) => (
          <HowToEarnItem key={item.title} {...item} />
        ))}
      </ul>
    </div>
  );
}
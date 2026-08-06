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
        <div
            className="relative w-[420px] h-[500px] bg-cover p-2 sm:p-5 text-[15px] sm:text-[16px]"
            style={{
                backgroundImage: "url('/images/pawsUser/Rectangle 512.png')",
                backgroundSize: "cover",
                width: "420px",
                height: "500px"
            }}
        >
            <div
                className="-ml-6 mt-4 text-[32px] relative flex items-center justify-left px-6 bg-cover bg-center
                 w-[370px] h-[66px] text-[var(--color-white)]"
                style={{
                    backgroundImage: "url('/images/pawsUser/Rectangle 480.png')",
                    width: "370px",
                    height: "66px"
                }}>
                Як отримати лапки?
            </div>
            <ul className="flex flex-col gap-3 mt-4">
                {howToEarn.map((item) => (
                    <HowToEarnItem key={item.title} {...item} />
                ))}
            </ul>
        </div>
    );
}
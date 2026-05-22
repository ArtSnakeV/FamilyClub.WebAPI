const advantages = [
    {
        title: "Особиста\nбібліотека",
        description: "Зберігай куплені електронні та аудіо книги та повертайся до них у будь-який момент",
        icon: "/images/main_page/advantages/advantages-icon-1.png",
    },
    {
        title: "Розумні\nрекомендації",
        description: "Сайт підбирає книги під твій смак і допомагає знайти щось нове",
        icon: "/images/main_page/advantages/advantages-icon-2.png",
    },
    {
        title: "Спільнота\nчитачів",
        description: "Обговорюй книги, ділись думками та знаходь однодумців",
        icon: "/images/main_page/advantages/advantages-icon-3.png",
    },
    {
        title: "Зручний пошук\nі фільтри",
        description: "Швидко знаходь потрібну книгу за жанром, автором або настроєм",
        icon: "/images/main_page/advantages/advantages-icon-4.png",
    },
];

type AdvantageCardProps = {
    title: string;
    description: string;
    icon: string;
    className?: string;
};

function AdvantageCard({ title, description, icon, className }: AdvantageCardProps) {
    return (
        <div className={`relative h-[325px] w-[250px] text-center text-[#f5f3ee] ${className ?? ""}`}>
            <img alt="" className="absolute inset-0 h-full w-full" src="/images/main_page/advantages/advantages-card-bg.png" />
            <img
                alt=""
                className="absolute left-1/2 top-[20px] h-[197px] w-[197px] -translate-x-1/2"
                src={icon}
            />
            <p className="absolute left-1/2 top-[10px] w-[210px] -translate-x-1/2 text-[15px] leading-[1.4]">
                {description}
            </p>
            <p className="absolute bottom-[40px] left-1/2 w-[200px] -translate-x-1/2 whitespace-pre-line font-mono text-[24px] font-semibold leading-[1.2]">
                {title}
            </p>
        </div>
    );
}

export default function AdvantagesSection() {
    return (
        <section className="relative z-0 -mt-[250px] pb-16 lg:-mt-[310px]">
            <div className="relative mx-auto hidden h-[1165px] w-full max-w-[1220px] lg:block">
                <div className="absolute left-0 top-0 h-[840px] w-full rounded-[10px] bg-[linear-gradient(189deg,#b7895e_6.8%,rgba(224,195,169,0)_52.5%,#b7895e_94.6%),linear-gradient(90deg,#c7a381_0%,#c7a381_100%)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)]" />

                <div className="absolute left-[63px] top-[28px] h-[594px] w-[1046px]">
                    <div className="absolute left-0 top-0 h-[594px] w-[520px] rotate-[21deg] shadow-[0px_10px_10px_0px_rgba(0,0,0,0.4)]">
                        <img
                            alt=""
                            className="h-full w-full box-border border-[40px] border-[#f5f3ee] object-cover"
                            src="/images/body/Rectangle%20295.png"
                        />
                    </div>
                    <div className="absolute right-0 top-[60px] h-[536px] w-[520px] rotate-[-2deg] shadow-[0px_10px_10px_0px_rgba(0,0,0,0.4)]">
                        <img
                            alt=""
                            className="h-full w-full box-border border-[40px] border-[#f5f3ee] object-cover"
                            src="/images/body/Rectangle%20296.png"
                        />
                    </div>
                </div>

                <h2 className="absolute left-1/2 top-[711px] w-full -translate-x-1/2 text-center font-mono text-[64px] font-bold text-[#242424]">
                    Наші переваги
                </h2>

                <div className="absolute left-1/2 top-[840px] flex h-[325px] w-[1120px] -translate-x-1/2 items-start gap-[40px]">
                    {advantages.map((item) => (
                        <AdvantageCard key={item.title} {...item} />
                    ))}
                </div>
            </div>

            <div className="mx-auto max-w-[1220px] px-4 lg:hidden">
                <div className="relative rounded-[10px] bg-[linear-gradient(189deg,#b7895e_6.8%,rgba(224,195,169,0)_52.5%,#b7895e_94.6%),linear-gradient(90deg,#c7a381_0%,#c7a381_100%)] px-6 pb-20 pt-[360px] text-center shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)]">
                    <div className="absolute left-1/2 top-[30px] h-[300px] w-[320px] -translate-x-1/2">
                        <img
                            alt=""
                            className="absolute left-0 top-0 w-[180px] rotate-[20deg] shadow-[0px_10px_10px_0px_rgba(0,0,0,0.4)]"
                            src="/images/body/Rectangle%20295.png"
                        />
                        <img
                            alt=""
                            className="absolute right-0 top-[40px] w-[180px] rotate-[-2deg] shadow-[0px_10px_10px_0px_rgba(0,0,0,0.4)]"
                            src="/images/body/Rectangle%20296.png"
                        />
                    </div>
                    <h2 className="font-mono text-[40px] font-bold text-[#242424] md:text-[64px]">Наші переваги</h2>
                </div>

                <div className="mt-10 grid justify-center gap-6 md:grid-cols-2">
                    {advantages.map((item) => (
                        <AdvantageCard key={item.title} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

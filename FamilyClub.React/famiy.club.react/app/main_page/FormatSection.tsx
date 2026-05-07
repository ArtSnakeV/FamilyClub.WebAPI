const formats = [
    {
        title: "Класичне читання — сторінки, які хочеться перегортати",
        background: "/images/main_page/format/format-bg-book.png",
        image: "/images/main_page/format/format-book.png",
    },
    {
        title: "Читай будь-де — усі книги в одному пристрої",
        background: "/images/main_page/format/format-bg-tablet.png",
        image: "/images/main_page/format/format-tablet.png",
    },
    {
        title: "Слухай історії в дорозі, під час прогулянок або відпочинку",
        background: "/images/main_page/format/format-bg-headphones.png",
        image: "/images/main_page/format/format-headphones.png",
    },
];

export default function FormatSection() {
    return (
        <section className="py-16">
            <div className="mx-auto max-w-[1220px] px-4 lg:px-0">
                <h2 className="text-center font-mono text-[48px] font-bold text-[#242424] lg:text-[64px]">
                    Формат, який зручний саме тобі
                </h2>

                <div className="mt-6 flex flex-wrap justify-between text-center text-[15px] font-semibold text-[#242424]">
                    <p className="w-[250px]">Класичне читання — сторінки, які хочеться перегортати</p>
                    <p className="w-[250px]">Читай будь-де — усі книги в одному пристрої</p>
                    <p className="w-[250px]">Слухай історії в дорозі, під час прогулянок або відпочинку</p>
                </div>

                <div className="mt-10 flex flex-wrap items-start justify-center gap-[200px]">
                    <div className="relative h-[266px] w-[190px]">
                        <img
                            alt=""
                            className="absolute left-[14.5px] top-0 h-[200px] w-[175px]"
                            src={formats[0].background}
                        />
                        <img
                            alt=""
                            className="absolute left-0 top-[114px] h-[152px] w-[159px]"
                            src={formats[0].image}
                        />
                    </div>
                    <div className="relative h-[259px] w-[156px]">
                        <img
                            alt=""
                            className="absolute left-[9px] top-0 h-[200px] w-[137px]"
                            src={formats[1].background}
                        />
                        <img
                            alt=""
                            className="absolute left-0 top-[109px] h-[150px] w-[156px]"
                            src={formats[1].image}
                        />
                    </div>
                    <div className="relative h-[246px] w-[200px]">
                        <img
                            alt=""
                            className="absolute left-0 top-0 h-[175px] w-[200px]"
                            src={formats[2].background}
                        />
                        <img
                            alt=""
                            className="absolute left-[18px] top-[79px] h-[167px] w-[163px]"
                            src={formats[2].image}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

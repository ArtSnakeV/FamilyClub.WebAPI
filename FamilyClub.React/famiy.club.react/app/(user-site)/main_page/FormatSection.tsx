const formats = [
    {
        title: "Класичне читання — сторінки, які хочеться перегортати",
        background: "/images/main_page/format/format-bg-book.svg",
        image: "/images/main_page/format/format-book.png",
    },
    {
        title: "Читай будь-де — усі книги в одному пристрої",
        background: "/images/main_page/format/format-bg-tablet.svg",
        image: "/images/main_page/format/format-tablet.png",
    },
    {
        title: "Слухай історії в дорозі, під час прогулянок або відпочинку",
        background: "/images/main_page/format/format-bg-headphones.svg",
        image: "/images/main_page/format/format-headphones.png",
    },
];

export default function FormatSection() {
    return (
        <section className="relative w-full overflow-hidden pb-4 pt-12">
            <div className="mx-auto max-w-[1220px] px-4 lg:px-0">
                <h2 className="text-center font-mono text-[48px] font-bold text-[#242424] lg:text-[64px]">
                    Формат, який зручний саме тобі
                </h2>

                <div className="mt-6 flex flex-wrap justify-around text-center text-[15px] font-semibold text-[#242424] gap-4">
                    <p className="max-w-[280px]">Класичне читання — сторінки, які хочеться перегортати</p>
                    <p className="max-w-[280px]">Читай будь-де — усі книги в одному пристрої</p>
                    <p className="max-w-[280px]">Слухай історії в дорозі, під час прогулянок або відпочинку</p>
                </div>

                <div className="mt-10 flex flex-wrap items-end justify-around gap-8 pb-4">
                    <div className="relative h-[266px] w-[190px] transition-transform hover:scale-105">
                        <img
                            alt=""
                            className="absolute left-[14.5px] top-0 h-[200px] w-[175px]"
                            src={formats[0].background}
                        />
                        <img
                            alt="Паперові книги"
                            className="absolute left-0 top-[114px] h-[152px] w-[159px]"
                            src={formats[0].image}
                        />
                    </div>
                    <div className="relative h-[259px] w-[156px] transition-transform hover:scale-105">
                        <img
                            alt=""
                            className="absolute left-[9px] top-0 h-[200px] w-[137px]"
                            src={formats[1].background}
                        />
                        <img
                            alt="Електронні книги"
                            className="absolute left-0 top-[109px] h-[150px] w-[156px]"
                            src={formats[1].image}
                        />
                    </div>
                    <div className="relative h-[246px] w-[200px] transition-transform hover:scale-105">
                        <img
                            alt=""
                            className="absolute left-0 top-0 h-[175px] w-[200px]"
                            src={formats[2].background}
                        />
                        <img
                            alt="Аудіокниги"
                            className="absolute left-[18px] top-[79px] h-[167px] w-[163px]"
                            src={formats[2].image}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Wooden Bookshelf Bar */}
            <div className="relative z-20 h-[50px] w-full bg-gradient-to-b from-[#9A6028] via-[#7E4D1E] to-[#5C3613] shadow-[0px_8px_15px_rgba(0,0,0,0.5)] border-t-[3px] border-[#B87838] border-b-[4px] border-[#3E220A]" />
        </section>
    );
}

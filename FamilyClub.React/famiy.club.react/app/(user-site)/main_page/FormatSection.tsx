const formats = [
    {
        label: "Паперові книги",
        title: "Класичне читання — сторінки, які хочеться перегортати",
        background: "/images/main_page/format/format-bg-book.svg",
        image: "/images/main_page/format/format-book.png",
    },
    {
        label: "eBook",
        title: "Читай будь-де — усі книги в одному пристрої",
        background: "/images/main_page/format/format-bg-tablet.svg",
        image: "/images/main_page/format/format-tablet.png",
    },
    {
        label: "Аудіокниги",
        title: "Слухай історії в дорозі, під час прогулянок або відпочинку",
        background: "/images/main_page/format/format-bg-headphones.svg",
        image: "/images/main_page/format/format-headphones.png",
    },
];

export default function FormatSection() {
    return (
        <section className="relative w-full overflow-hidden pt-10 pb-0">
            <div className="mx-auto max-w-[1220px] px-4 lg:px-0">
                {/* Top Category Labels row matching Figma y=4002 */}
                <div className="flex flex-wrap justify-around text-center font-sans text-[20px] font-semibold text-[#242424] mb-12">
                    <span className="w-[260px]">{formats[0].label}</span>
                    <span className="w-[260px]">{formats[1].label}</span>
                    <span className="w-[260px]">{formats[2].label}</span>
                </div>

                {/* Heading matching Figma y=4667 */}
                <h2 className="text-center font-mono text-[40px] font-bold text-[#242424] md:text-[56px] mb-8">
                    Формат, який зручний саме тобі
                </h2>

                {/* Descriptions row matching Figma y=4767 */}
                <div className="flex flex-wrap justify-around text-center font-sans text-[16px] font-medium text-[#242424] mb-8 gap-4">
                    <p className="w-[260px]">{formats[0].title}</p>
                    <p className="w-[260px]">{formats[1].title}</p>
                    <p className="w-[260px]">{formats[2].title}</p>
                </div>

                {/* Device Images sitting on the shelf */}
                <div className="flex flex-wrap items-end justify-around gap-8 pb-4">
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

            {/* Bottom Wooden Bookshelf Bar matching site design system */}
            <div className="relative z-20 h-[80px] w-full shadow-[0px_4px_8px_0px_rgba(0,0,0,0.35)] bg-[#7e4d1e]">
                <img src="/images/catalog/shelf_tex1.png" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-50 pointer-events-none" alt="" />
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.27)] pointer-events-none" />
                <div className="absolute left-0 right-0 bottom-0 h-[60px]">
                    <img src="/images/catalog/shelf_tex2.png" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply pointer-events-none" alt="" />
                    <img src="/images/catalog/shelf_tex3.png" className="absolute inset-0 w-full h-full object-cover pointer-events-none" alt="" />
                </div>
            </div>
        </section>
    );
}

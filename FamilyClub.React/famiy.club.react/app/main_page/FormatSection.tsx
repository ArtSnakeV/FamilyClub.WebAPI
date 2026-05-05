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
            <div className="mx-auto max-w-[1220px] px-4 text-center">
                <h2 className="font-mono text-[36px] font-bold text-[#242424] md:text-[64px]">
                    Формат, який зручний саме тобі
                </h2>

                <div className="mt-8 grid gap-10 md:grid-cols-3">
                    {formats.map((item) => (
                        <div key={item.title} className="flex flex-col items-center gap-6">
                            <p className="max-w-[250px] text-[15px] font-semibold text-[#242424]">{item.title}</p>
                            <div className="relative h-[200px] w-[200px]">
                                <img alt="" className="absolute inset-0 h-full w-full" src={item.background} />
                                <img
                                    alt=""
                                    className="absolute bottom-0 left-1/2 w-[160px] -translate-x-1/2"
                                    src={item.image}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

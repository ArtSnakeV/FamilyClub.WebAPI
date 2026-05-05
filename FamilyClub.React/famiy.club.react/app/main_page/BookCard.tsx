type BookCardProps = {
    title: string;
    author?: string | null;
    price: string;
    image?: string | null;
    rating?: number | null;
};

const clampRating = (value: number) => Math.max(0, Math.min(5, value));

export default function BookCard({ title, author, price, image, rating }: BookCardProps) {
    const roundedRating = clampRating(Math.round(rating ?? 0));
    const starString = Array.from({ length: 5 }, (_, index) => (index < roundedRating ? "★" : "☆")).join("");

    return (
        <div className="relative h-[400px] w-[260px]">
            <div
                className="absolute inset-0 rounded-bl-[30px] rounded-br-[30px] shadow-[0px_10px_10px_0px_rgba(36,36,36,0.3)]"
                style={{
                    backgroundImage:
                        "linear-gradient(0deg, rgba(245, 243, 238, 0.2) 84.667%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgb(245, 243, 238) 0%, rgb(245, 243, 238) 100%)",
                }}
            />

            <div className="absolute left-0 top-[20px] flex flex-col gap-2">
                {[
                    {
                        bg: "/images/main_page/icons/rec-icon-paper-bg.png",
                        icon: "/images/main_page/icons/rec-icon-paper.png",
                    },
                    {
                        bg: "/images/main_page/icons/rec-icon-ebook-bg.png",
                        icon: "/images/main_page/icons/rec-icon-ebook.png",
                    },
                    {
                        bg: "/images/main_page/icons/rec-icon-audio-bg.png",
                        icon: "/images/main_page/icons/rec-icon-audio.png",
                    },
                ].map((item) => (
                    <div key={item.icon} className="relative h-[30px] w-[30px]">
                        <img alt="" className="absolute inset-0" src={item.bg} />
                        <img alt="" className="absolute inset-[5px]" src={item.icon} />
                    </div>
                ))}
            </div>

            <img
                alt=""
                className="absolute right-[18px] top-[20px] h-[34px] w-[34px]"
                src="/images/main_page/icons/rec-icon-favorite.png"
            />

            {image ? (
                <img
                    alt={title}
                    className="absolute left-1/2 top-[20px] h-[250px] w-[184px] -translate-x-1/2 object-contain"
                    src={image}
                />
            ) : (
                <div className="absolute left-1/2 top-[20px] h-[250px] w-[184px] -translate-x-1/2 rounded-[12px] bg-[rgba(36,36,36,0.1)]" />
            )}

            <div className="absolute bottom-[20px] left-[20px] right-[20px]">
                {/* User edits (placeholder stars) commented out as requested. */}
                {/*
                <div className="mb-3 flex gap-1">
                    {ratingStars.map((_, index) => (
                        "☆"
                        // "★"
                        // <img
                        //     alt=""
                        //     className="h-[21px] w-[21px]"
                        //     key={index}
                        //     src="/images/main_page/icons/rec-icon-star.png"
                        // />
                    ))}
                </div>
                */}
                <div className="mb-3 flex gap-1 text-[21px] tracking-[2px]" aria-label={`Рейтинг ${roundedRating}/5`}>
                    {starString}
                </div>

                <div className="mb-3">
                    <p className="font-mono text-[18px] font-medium leading-[1.2] text-[#242424]">
                        {title}
                    </p>
                    {author ? (
                        <p className="text-[14px] text-[rgba(36,36,36,0.7)]">{author}</p>
                    ) : (
                        <div className="h-[18px]" />
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-[24px] text-[#242424]">{price}</span>
                    <img alt="" className="h-[30px] w-[30px]" src="/images/main_page/icons/rec-icon-basket.png" />
                </div>
            </div>
        </div>
    );
}
import Link from "next/link";

type BookCardProps = {
    title: string;
    author?: string | null;
    price: string;
    image?: string | null;
    rating?: number | null;
    href?: string;
    formatTags?: Array<"paper" | "ebook" | "audio">;
};

const clampRating = (value: number) => Math.max(0, Math.min(5, value));

const formatIconMap = {
    paper: {
        bg: "/images/main_page/icons/rec-icon-paper-bg.png",
        icon: "/images/main_page/icons/rec-icon-paper.png",
    },
    ebook: {
        bg: "/images/main_page/icons/rec-icon-ebook-bg.png",
        icon: "/images/main_page/icons/rec-icon-ebook.png",
    },
    audio: {
        bg: "/images/main_page/icons/rec-icon-audio-bg.png",
        icon: "/images/main_page/icons/rec-icon-audio.png",
    },
};

export default function BookCard({ title, author, price, image, rating, href, formatTags }: BookCardProps) {
    const roundedRating = clampRating(Math.round(rating ?? 0));
    const ratingStars = Array.from({ length: 5 }, (_, index) => (index < roundedRating ? "★" : "☆"));
    const activeFormatTags = formatTags?.length ? formatTags : [];

    const card = (
        <div className="relative h-[400px] w-[260px]">
            <div
                className="absolute inset-0 rounded-bl-[30px] rounded-br-[30px] shadow-[0px_10px_10px_0px_rgba(36,36,36,0.3)]"
                style={{
                    backgroundImage:
                        "linear-gradient(0deg, rgba(245, 243, 238, 0.2) 84.667%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgb(245, 243, 238) 0%, rgb(245, 243, 238) 100%)",
                }}
            />

            {activeFormatTags.length > 0 ? (
                <div className="absolute left-0 top-[20px] flex flex-col gap-2">
                    {activeFormatTags.map((tag) => {
                        const item = formatIconMap[tag];
                        return (
                            <div key={tag} className="relative h-[30px] w-[30px]">
                                <img alt="" className="absolute inset-0" src={item.bg} />
                                <img alt="" className="absolute inset-[5px]" src={item.icon} />
                            </div>
                        );
                    })}
                </div>
            ) : null}

            <img
                alt=""
                className="absolute right-[18px] top-[20px] z-10 h-[34px] w-[34px]"
                src="/images/header/favorite_border_24px.png"
            />

            {image ? (
                <img
                    alt={title}
                    className="absolute left-1/2 top-[20px] h-[190px] w-[140px] -translate-x-1/2 object-contain"
                    src={image}
                />
            ) : (
                <div className="absolute left-1/2 top-[20px] h-[190px] w-[140px] -translate-x-1/2" />
            )}

            <div className="absolute bottom-[20px] left-[20px] right-[20px]">
                <div className="mb-3 flex gap-1 text-[21px] tracking-[2px]" aria-label={`Рейтинг ${roundedRating}/5`}>
                    {ratingStars.map((star, index) => (
                        <span key={`${title}-star-${index}`}>{star}</span>
                    ))}
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

    if (href) {
        return (
            <Link aria-label={title} className="block" href={href}>
                {card}
            </Link>
        );
    }

    return card;
}
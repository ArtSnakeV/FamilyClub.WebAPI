interface Props {
    rating: number;
    max?: number;
}

export default function StarRating({ rating, max = 5 }: Props) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: max }).map((_, i) => (
                <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
                    ★
                </span>
            ))}
        </div>
    );
}
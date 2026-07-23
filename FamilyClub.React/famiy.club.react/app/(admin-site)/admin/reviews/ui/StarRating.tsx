import Image from "next/image";

interface Props {
  rating: number | string;
  max?: number;
}

export default function StarRating({ rating, max = 5 }: Props) {
  const numericRating = Number(rating) || 0;
  return (
    <div className="flex gap-0.5 items-center">
      {Array.from({ length: max }).map((_, i) => {
        const isFilled = i < numericRating;

        return (
          <Image
            key={i}
            src={
              isFilled
                ? "/images/reviewsAdmin/star-solid-full (2) 1.png" 
                : "/images/reviewsAdmin/star-solid-full (2) 5.png" 
            }
            alt={isFilled ? "filled star" : "empty star"}
            width={16}
            height={16}
            className="shrink-0 object-contain"
          />
        );
      })}
    </div>
  );
}
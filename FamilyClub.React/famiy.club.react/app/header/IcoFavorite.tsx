import Link from "next/link";
import Image from "next/image";


export default function IcoFavorite() {
    return (
        <>
            <div className="relative w-[34px] h-[29px] ">
                <Image
                    src="/images/favorite_border_24px.png"
                    alt="favor"
                    className="object-contain"
                    priority
                    width={34}
                    height={29}
                />
            </div>
        </>
    )
}
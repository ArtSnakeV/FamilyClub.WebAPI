import Image from "next/image";


export default function FavoriteButton() {
    return (
            <div className="relative w-[34px] h-[29px] ">
                <Image
                    src="/images/header/favorite_border_24px.png"
                    alt="favor"
                    className="object-contain h-auto w-auto"
                    style={{ width: "auto", height: "auto" }}
                    priority
                    width={34}
                    height={29}
                />
            </div>
    );
}
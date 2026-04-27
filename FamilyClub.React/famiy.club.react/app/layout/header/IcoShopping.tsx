import Link from "next/link";
import Image from "next/image";


export default function IcoShopping() {
    return (
        <>
            <div className="relative w-[37px] h-[32px] ">
                <Image
                    src="/images/shopping_basket_24px.png"
                    alt=""
                    className="object-contain"
                    priority
                    width={37}
                    height={32}
                />
            </div>
        </>
    )
}
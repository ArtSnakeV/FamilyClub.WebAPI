import Link from "next/link";
import Image from "next/image";


export default function Logo() {
    return (
        <>
            <Link
                href="/"
                className="absolute top-[0px]"
            >
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={189}
                    height={83}
                    className="object-contain"
                    priority
                />
            </Link>
        </>
    )
}
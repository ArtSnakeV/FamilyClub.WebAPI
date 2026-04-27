import Link from "next/link";
import Image from "next/image";


export default function PersonIco() {
    return (
        <>
            <div className="flex relative items-center h-[50px] w-[194px] ">
                <div className="w-[40px] h-[40px] flex items-center">
                    <Image
                        src="/images/person_24px.png"
                        alt="person"
                        className="object-contain"
                        priority
                        width={27}
                        height={27}
                    />
                </div>
                <Link href="/login" className="w-[95px] h-[24px] text-[#242424] font-normal text-[16px] leading-[150%] tracking-[-0.011em] text-center relative left-[14px]">
                    Авторуватися
                </Link>
            </div>
        </>
    )
}
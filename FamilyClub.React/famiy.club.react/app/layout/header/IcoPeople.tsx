import Image from "next/image";


export default function IcoPeople() {
    return (
        <>
            <div className="relative w-[37px] h-[23px] ">
                <Image
                    src="/images/header/people_24px.png"
                    alt="people"
                    className="object-contain h-auto w-auto"
                    style={{ width: "auto", height: "auto" }}
                    priority
                    width={37}
                    height={23}
                />
            </div>
        </>
    )
}
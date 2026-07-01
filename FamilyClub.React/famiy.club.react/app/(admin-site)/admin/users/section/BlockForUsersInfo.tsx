import Image from "next/image";

interface BlockForUsersInfoProps {
    icon: string;
    title: string;
    value: string | number;
    subtitle: string;
}

export default function BlockForUsersInfo({
    icon,
    title,
    value,
    subtitle,
}: BlockForUsersInfoProps) {

    return (
        <div
            className="w-[300px] h-[170px] relative z-10 flex flex-row items-center px-10 gap-12"
            style={{
                backgroundImage: "url('/images/usersPageAdmin/Rectangle 686.png')",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
            }}
        >
            <div className="flex-shrink-0">
                <Image src={icon} alt={title} width={80} height={80} />
            </div>
            <div className="flex flex-col w-[180px] -mt-2 -ml-6">
                <span className="w-[180px] font-['Source_Sans_Pro'] 
                text-[var(--color-black)] font-semibold 
                text-[20px] leading-[150%] tracking-[-0.011em]">
                    {title}
                </span>
                <span className="w-[180px] font-['Source_Sans_Pro'] 
                text-[var(--color-black)] font-semibold 
                text-[40px] leading-[150%] tracking-[-0.011em] ">
                    {value}
                </span>
                <span className="text-[13px] text-[#1F7A4D]">
                    {subtitle}
                </span>
            </div>
        </div>
    )
}
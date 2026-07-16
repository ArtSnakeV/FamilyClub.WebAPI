import Image from "next/image";

interface BlockForUsersInfoProps {
    icon: string;
    title: string;
    value: string | number;
    subtitle: string;
}

export default function BlockedSectionUsersHeader({
    icon,
    title,
    value,
    subtitle,
}: BlockForUsersInfoProps) {

    return (
        <div
            className="w-[368px] max-w-full mt-[10vh] h-auto min-h-[170px] relative z-10 flex flex-row flex-wrap items-center px-10 gap-3"
            style={{
                backgroundImage: "url('/images/usersPageAdmin/Rectangle 686.png')",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
            }}
        >
            <div className="flex-shrink-0">
                <Image src={icon} alt={title} width={80} height={80} />
            </div>
            <div className="flex flex-col min-w-[170px] max-w-full flex-1 -mt-2">
                <span className="font-['Source_Sans_Pro'] 
                text-[var(--color-black)] font-semibold 
                text-[17px] leading-[150%] tracking-[-0.011em] truncate">
                    {title}
                </span>
                <span className="font-['Source_Sans_Pro'] 
                text-[var(--color-black)] font-semibold 
                text-[40px] leading-[150%] tracking-[-0.011em] truncate">
                    {value}
                </span>
                <span className="text-[13px] text-[#1F7A4D] truncate">
                    {subtitle}
                </span>
            </div>
        </div>
    )
}
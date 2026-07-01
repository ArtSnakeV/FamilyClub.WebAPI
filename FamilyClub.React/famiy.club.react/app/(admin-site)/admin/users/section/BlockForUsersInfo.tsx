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
                <Image src={icon} alt={title} width={48} height={48} />
            </div>
            <div className="flex flex-col">
                <span className="text-[16px] font-semibold text-[#242424]">
                    {title}
                </span>
                <span className="text-[32px] font-bold text-[#242424]">
                    {value}
                </span>
                <span className="text-[13px] text-[#1F7A4D]">
                    {subtitle}
                </span>
            </div>
        </div>
    )
}
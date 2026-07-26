import Image from "next/image";

interface RoleSummaryCardProps {
    icon: string;
    title: string;
    value: string | number;
    subtitle: string;
    selected?: boolean;
    onClick?: () => void;
}

export default function RoleSummaryCard({
    icon,
    title,
    value,
    subtitle,
    selected = false,
    onClick,
}: RoleSummaryCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-[240px] min-w-[220px] max-w-full min-h-[170px] relative z-10 flex flex-row items-center px-6 gap-4 text-left transition ${
                selected ? "scale-[1.02]" : "hover:scale-[1.01]"
            }`}
            style={{
                backgroundImage: "url('/images/usersPageAdmin/Rectangle 686.png')",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
            }}
        >
            <div className="flex-shrink-0">
                <Image src={icon} alt={title} width={64} height={64} />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
                <span className="font-['Source_Sans_Pro'] text-[var(--color-black)] font-semibold text-[18px] leading-[140%] truncate">
                    {title}
                </span>
                <span className="font-['Source_Sans_Pro'] text-[var(--color-black)] font-semibold text-[34px] leading-[140%]">
                    {value}
                </span>
                <span className="text-[12px] text-[#1F7A4D] line-clamp-2">
                    {subtitle}
                </span>
            </div>
        </button>
    );
}

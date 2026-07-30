import Image from "next/image";

type Props = {
  icon: string;
  title: string;
  desc: string;
};

export default function HowToEarnItem({ icon, title, desc }: Props) {
  return (
    <li className="flex items-center gap-3">
      <span className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center">
        <Image src={icon} width={18} height={18} alt={title} />
      </span>
      <span className="text-[13px] text-black">
        {title}
        <br />
        <span className="text-[11px] text-black/60">{desc}</span>
      </span>
    </li>
  );
}
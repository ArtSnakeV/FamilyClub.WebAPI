import Link from "next/link";

type PromoBannerProps = {
    title: string;
    subtitle?: string;
    href?: string;
    backgroundImage?: string;
};

export default function PromoBanner({
    title,
    subtitle,
    href = "/categories",
    backgroundImage = "/images/body/Banner.png",
}: PromoBannerProps) {
    return (
        <section className="py-8">
            <div className="mx-auto max-w-[1220px] px-4 lg:px-0">
                <Link href={href} className="group relative block overflow-hidden rounded-[20px] shadow-[0px_4px_20px_rgba(0,0,0,0.3)]">
                    <img
                        alt=""
                        className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={backgroundImage}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(36,36,36,0.7)] to-transparent" />
                    <div className="absolute bottom-[30px] left-[40px] md:bottom-[50px] md:left-[80px]">
                        <h3 className="font-mono text-[32px] font-bold text-[#f5f3ee] md:text-[48px]" style={{ textShadow: "0px 2px 10px rgba(0,0,0,0.5)" }}>
                            {title}
                        </h3>
                        {subtitle ? (
                            <p className="mt-2 text-[16px] text-[#f5f3ee] md:text-[20px]" style={{ textShadow: "0px 2px 10px rgba(0,0,0,0.5)" }}>
                                {subtitle}
                            </p>
                        ) : null}
                    </div>
                </Link>
            </div>
        </section>
    );
}

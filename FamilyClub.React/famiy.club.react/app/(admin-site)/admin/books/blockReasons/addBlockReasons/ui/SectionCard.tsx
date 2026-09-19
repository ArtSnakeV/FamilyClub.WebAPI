type Props = {
  title: string;
  backgroundImage: string;
  backgroundSize: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionCard({
  title,
  backgroundImage,
  children,
  className,
  backgroundSize,
}: Props) {
  return (
    <div className={`relative w-full min-h-full pb-[48px] ${className ?? ""}`}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none admin-parchment-bg bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: backgroundSize || undefined,
        }}
      />
      <div className="relative z-10">
        <div
          className="-ml-[10px] mt-[48px] bg-cover bg-center w-[420px] h-[72px] flex items-center justify-center"
          style={{
            backgroundImage: "url('/images/addProducts/Rectangle 302.svg')",
          }}
        >
          <p className="text-[var(--color-cream)] font-['Roboto_Mono'] font-semibold text-[24px] leading-[150%] tracking-[-0.011em] pb-[10px]">
            {title}
          </p>
        </div>
        <div className="w-[560px] mt-[6px] ml-[38px] flex flex-col gap-2">
          {children}
        </div>
      </div>
    </div>
  );
}

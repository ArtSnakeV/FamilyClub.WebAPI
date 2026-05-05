export default function Hero() {
    return (
        <section className="relative bg-[#f5f3ee] py-10">
            <div className="relative mx-auto h-[420px] max-w-[1220px] md:h-[520px] lg:h-[659px]">
                <img
                    alt=""
                    className="absolute left-1/2 top-[40px] h-[510px] w-[min(1960px,100vw)] -translate-x-1/2 object-cover blur-[2.5px]"
                    src="/images/main_page/hero/hero-background.png"
                />
                <div className="absolute inset-0 bg-[rgba(36,36,36,0.5)] blur-[50px]" />

                <img
                    alt=""
                    className="absolute left-0 top-[240px] w-[240px] md:w-[320px]"
                    src="/images/main_page/hero/hero-vines-left.png"
                />
                <img
                    alt=""
                    className="absolute right-0 top-[230px] w-[240px] md:w-[320px]"
                    src="/images/main_page/hero/hero-vines-right.png"
                />

                <div className="absolute left-4 top-[170px] h-[341px] w-[230px] md:left-[24px] md:top-[170px]">
                    <img
                        alt=""
                        className="absolute inset-0 h-full w-full rotate-[-7.5deg] object-cover drop-shadow-[0px_0px_30px_rgba(245,243,238,0.9)]"
                        src="/images/main_page/hero/hero-book-4.png"
                    />
                    <img
                        alt=""
                        className="absolute inset-0 h-full w-full rotate-[-7.5deg] object-cover"
                        src="/images/main_page/hero/hero-book-3.png"
                    />
                    <img
                        alt=""
                        className="absolute inset-0 h-full w-full rotate-[-7.5deg] object-cover"
                        src="/images/main_page/hero/hero-book-2.png"
                    />
                    <img
                        alt=""
                        className="absolute inset-0 h-full w-full rotate-[-7.5deg] object-cover"
                        src="/images/main_page/hero/hero-book-1.png"
                    />
                </div>

                <img
                    alt="Нова твоя онлайн-бібліотека"
                    className="absolute left-1/2 top-[140px] w-[min(835px,92%)] -translate-x-1/2"
                    src="/images/main_page/hero/hero-title.png"
                />

                <img
                    alt=""
                    className="absolute left-[22%] top-[210px] hidden w-[110px] rotate-[3deg] md:block"
                    src="/images/main_page/hero/hero-arrow.png"
                />

                <img
                    alt=""
                    className="absolute bottom-[60px] right-[30px] w-[320px] opacity-60 md:right-[40px] md:w-[420px]"
                    src="/images/main_page/hero/hero-cloud.png"
                />

                <p
                    className="absolute bottom-[195px] right-[40px] w-[320px] text-right font-mono text-[18px] font-medium text-[#f5f3ee] md:bottom-[210px] md:right-[60px] md:w-[520px] md:text-[24px]"
                    style={{ textShadow: "0px 0px 10px #242424, 0px 0px 28px #242424" }}
                >
                    Не знаєш, що ще почитати? Є в нас ідейка
                </p>
            </div>
        </section>
    );
}
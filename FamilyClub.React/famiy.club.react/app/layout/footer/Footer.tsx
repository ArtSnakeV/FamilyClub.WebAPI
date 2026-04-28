import Link from 'next/link';
import Image from 'next/image';



const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        /* Root footer container (Кореневий контейнер футера) */
        <footer className="w-full min-h-[696px] flex flex-col justify-end overflow-visible">

            {/* 
                1. MAIN INNER BLOCK (ГОЛОВНИЙ ВНУТРІШНІЙ БЛОК) 
                - backgroundImage: sets the footer background (встановлює фон футера)
                - drop-shadow: follows the transparency of the curved edge (повторює прозорість фігурного краю)
                - flex-col: distributes content and copyright vertically (розподіляє контент та копірайт вертикально)
            */}
            <div
                className="relative w-full h-[593.35px] border-x-[10px] border-b-[10px] border-footer-inner drop-shadow-[0_-8px_30px_rgba(0,0,0,0.5)] bg-top bg-cover bg-no-repeat flex flex-col"
                style={{
                    backgroundImage: "url('/images/Layout/Footer/Rectangle198.png')",
                }}
            >

                {/* 
                    2. CONTENT GRID WRAPPER (ОБОРТКА СІТКИ КОНТЕНТУ)
                    - flex-grow: pushes the copyright block to the very bottom (виштовхує блок копірайту в самий низ)
                    - gap: controls the distance between columns (контролює відстань між колонками)
                */}
                <div className="relative z-10 container mx-auto flex-grow flex justify-center items-start pt-[50px]">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px] md:gap-[80px] items-start w-full max-w-[1000px]">

                        {/* --- COLUMN 1: QR CODE & MOBILE APPS (КОЛОНКА 1: QR-КОД ТА МОБІЛЬНІ ДОДАТКИ) --- */}
                        <div className="flex flex-col items-center w-full md:w-[222px]">
                            {/* QR Code image (Зображення QR-коду) */}
                            <div className="w-[215px] h-[215px] mb-[28px]">
                                <Image
                                    src="/images/Layout/Footer/FooterQRCode.png"
                                    alt="QR Code"
                                    width={215}
                                    height={215}
                                    priority
                                />
                            </div>

                            {/* Store Buttons Container (Контейнер кнопок магазинів) */}
                            <div className="flex flex-col gap-[12px]">
                                {/* App Store Button (Кнопка App Store) */}
                                <Link
                                    href="https://apple.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-[222px] h-[61.59px] bg-brand-black rounded-[20px] flex items-center px-[16px] gap-[14px] hover:opacity-90 transition-opacity"
                                >
                                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                                        <Image src="/images/Layout/Footer/AppleIcon.svg" width={28} height={34} alt="Apple" />
                                    </div>
                                    <div className="flex flex-col justify-center h-[42px] text-brand-white text-[14px] tracking-[-0.011em]">
                                        <p className="font-normal">Завантажити з</p>
                                        <p className="font-semibold">App Store</p>
                                    </div>
                                </Link>

                                {/* Google Play Button (Кнопка Google Play) */}
                                <Link
                                    href="https://google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-[222px] h-[61.59px] bg-brand-black rounded-[20px] flex items-center px-[16px] gap-[14px] hover:opacity-90 transition-opacity"
                                >
                                    <div className="w-[60px] h-[60px] flex items-center justify-center">
                                        <Image src="/images/Layout/Footer/GooglePlayIcon.svg" width={32} height={36} alt="Google Play" />
                                    </div>
                                    <div className="flex flex-col justify-center h-[42px] text-brand-white text-[14px] tracking-[-0.011em]">
                                        <p className="font-normal">Завантажити з</p>
                                        <p className="font-semibold">Google Play</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* --- COLUMN 2: NAVIGATION LINKS (КОЛОНКА 2: НАВІГАЦІЙНІ ПОСИЛАННЯ) --- */}
                        <div className="flex flex-col items-start w-full md:w-[295px] gap-[25px]">
                            <h2 className="footer-title">Питання</h2>
                            <nav className="flex flex-col items-start gap-[15px]">
                                <Link className="footer-text" href="#">Оплата і доставка</Link>
                                <Link className="footer-text" href="#">Захист персональних даних</Link>
                                <Link className="footer-text" href="#">Умови користування</Link>
                                <Link className="footer-text" href="#">Повернення товару</Link>
                                <Link className="footer-text" href="#">Політика публікації товару</Link>
                            </nav>
                        </div>

                        {/* --- COLUMN 3: CONTACT INFO (КОЛОНКА 3: КОНТАКТНА ІНФОРМАЦІЯ) --- */}
<div className="flex flex-col items-start w-full md:w-[295px] gap-[25px]">
    <h2 className="footer-title">Контакти</h2>

    <div className="flex flex-col items-start gap-[15px]">

        {/* 1. Address Row (Рядок з адресою) */}
        <div className="flex items-center gap-[15px]">
            {/* Standardized container: 34px width (Стандартизований контейнер: ширина 34px) */}
            <div className="w-[34px] h-[34px] flex items-center justify-center">
                <Image
                    src="/images/Layout/Footer/AddressIcon.svg"
                    width={21.41} 
                    height={27.36}
                    alt="Address"
                />
            </div>
            <p className="footer-text h-[27px] flex items-center">
                «Libria», a/c 64, Львів 79000
            </p>
        </div>

        {/* 2. Phone Row (Рядок з телефоном) */}
        <div className="flex items-center gap-[15px]">
            <div className="w-[34px] h-[34px] flex items-center justify-center">
                <Image
                    src="/images/Layout/Footer/PhoneIcon.svg"
                    width={25.6}
                    height={28.8}
                    alt="Phone"
                />
            </div>
            <a href="tel:08005553535" className="footer-text h-[27px] flex items-center hover:opacity-70 transition-opacity">
                0 (800) 555 35 35
            </a>
        </div>

        {/* 3. Email Row (Рядок з поштою) */}
        <div className="flex items-center gap-[15px]">
            <div className="w-[34px] h-[34px] flex items-center justify-center">
                <Image
                    src="/images/Layout/Footer/EmailIcon.svg"
                    width={25.6}
                    height={19.2}
                    alt="Email"
                />
            </div>
            <a href="mailto:help@libria.com" className="footer-text h-[27px] flex items-center hover:opacity-70 transition-opacity">
                help@libria.com
            </a>
        </div>

        {/* 4. Social Media Row (Рядок з іконками соцмереж) */}
        <div className="flex items-center gap-[25px] mt-[10px] w-full">
            <Link href="#" className="hover:scale-110 transition-transform">
                <Image src="/images/Layout/Footer/TelegramIcon.svg" width={41} height={40} alt="Telegram" />
            </Link>
            <Link href="#" className="hover:scale-110 transition-transform">
                <Image src="/images/Layout/Footer/FacebookIcon.svg" width={40} height={40} alt="Facebook" />
            </Link>
            <Link href="#" className="hover:scale-110 transition-transform">
                <Image src="/images/Layout/Footer/InstagrammIcon.svg" width={40} height={40} alt="Instagram" />
            </Link>
            <Link href="#" className="hover:scale-110 transition-transform">
                <Image src="/images/Layout/Footer/ViberIcon.svg" width={40} height={40} alt="Viber" />
            </Link>
        </div>
    </div>
</div>

                    </div>
                </div>

                {/* 
                    3. COPYRIGHT SECTION (СЕКЦІЯ КОПІРАЙТУ)
                    - Positioned inside the background block at the bottom (Розміщена всередині фонового блоку знизу)
                */}
                <div className="relative z-10 w-full h-[102.66px] flex items-center px-4">
                    <div className="max-w-[1220px] mx-auto w-full h-[61.59px] border-t-2 border-footer-divider flex items-center justify-center">
                        <p className="footer-text text-brand-black tracking-[-0.011em] w-[283px] text-center">
                            © «Libria» {currentYear}. Усі права захищено
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;

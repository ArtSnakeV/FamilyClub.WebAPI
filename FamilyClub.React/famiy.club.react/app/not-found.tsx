import Link from "next/link";

// ── Assets from /public/images/ (project files) ──
// Background photo — вже є в проекті
const imgRectangle326 = "/images/addProducts/Rectangle 326.png";
// Decorative SVGs — /public/images/not-found/
const imgEllipseDeco    = "/images/not-found/ellipse-deco.svg";
const imgPageTexture    = "/images/not-found/page-texture.svg";
const imgTornBookmark   = "/images/not-found/torn-bookmark.svg";
const imgNotebookLines  = "/images/not-found/notebook-lines.svg";


export default function NotFound() {
  return (
    <div className="relative" style={{ background: "#F5F3EE" }}>

      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <img
          alt=""
          src={imgRectangle326}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "blur(5px)", transform: "scale(1.04)" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(36,36,36,0.4)" }} />
      </div>

      <div
        className="relative mx-auto"
        style={{
          maxWidth: 1220,
          background: "#F5F3EE",
          boxShadow: "0px 0px 30px 0px black",
          paddingBottom: 80,
          overflow: "hidden",
        }}
      >
        <div
          className="absolute pointer-events-none"
          style={{ right: -60, top: 80, width: 460, height: 460, opacity: 0.5 }}
        >
          <img alt="" src={imgEllipseDeco} className="w-full h-full" />
        </div>
        {/* Декоративний еліпс — лівий нижній */}
        <div
          className="absolute pointer-events-none"
          style={{ left: -140, top: 200, width: 460, height: 460, opacity: 0.45 }}
        >
          <img alt="" src={imgEllipseDeco} className="w-full h-full" />
        </div>

        {/* ── Заголовок "Помилка" ── */}
        <h1
          className="relative text-center text-[#242424]"
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: 64,
            lineHeight: "75px",
            letterSpacing: "-0.011em",
            paddingTop: 36,
            margin: 0,
          }}
        >
          Помилка
        </h1>

        {/* ── Основний рядок: книга + текст ── */}
        <div
          className="relative flex flex-col lg:flex-row items-center lg:items-start"
          style={{ gap: 56, padding: "36px 56px 0" }}
        >
          {/* ═══ Ілюстрація книги ═══ */}
          <div
            className="relative flex-shrink-0"
            style={{ width: 548, height: 402 }}
          >
            {/* Задня обкладинка (темно-зелена) */}
            <div
              className="absolute"
              style={{ background: "#032f1b", width: 548, height: 370, top: 24, left: 0, borderRadius: 3 }}
            />
            {/* Передня обкладинка (зелена) */}
            <div
              className="absolute"
              style={{ background: "#005B33", width: 526, height: 364, top: 14, left: 10, borderRadius: 3 }}
            />
            {/* Сторінки */}
            <div
              className="absolute"
              style={{
                background: "#E1E1E1",
                border: "1px solid #9b9b9b",
                width: 488,
                height: 330,
                top: 28,
                left: 28,
                borderRadius: 2,
              }}
            />
            {/* Текстура правої сторінки */}
            <div className="absolute" style={{ width: 232, height: 330, top: 28, left: 266 }}>
              <img alt="" src={imgPageTexture} className="w-full h-full" />
            </div>
            {/* Текстура лівої сторінки */}
            <div className="absolute" style={{ width: 232, height: 330, top: 28, left: 36 }}>
              <img alt="" src={imgPageTexture} className="w-full h-full" />
            </div>
            {/* Лінії на ЛІВІЙ сторінці */}
            <div className="absolute" style={{ left: 44, top: 52, width: 178, height: 256 }}>
              <img alt="" src={imgNotebookLines} className="w-full h-full" />
            </div>
            {/* 404 на ПРАВІЙ сторінці */}
            <div
              className="absolute text-center select-none"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 118,
                lineHeight: 1,
                color: "#005B33",
                right: 30,
                width: 236,
                top: 80,
              }}
            >
              404
            </div>
            {/* Підпис під 404 */}
            <div
              className="absolute text-center select-none"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                lineHeight: 1.5,
                color: "#9396a8",
                right: 30,
                width: 236,
                top: 262,
              }}
            >
              Сторінку не знайдено
            </div>
            {/* Рвана закладка (поверх) */}
            <div className="absolute" style={{ left: 258, top: 0, width: 58, height: 352, zIndex: 1 }}>
              <img alt="" src={imgTornBookmark} className="w-full h-full" />
            </div>
          </div>

          {/* ═══ Текстовий блок справа ═══ */}
          <div className="flex flex-col items-start" style={{ gap: 50, paddingTop: 16 }}>
            <div className="flex flex-col" style={{ gap: 15 }}>
              <h2
                className="text-black"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 55,
                  lineHeight: 1.5,
                  letterSpacing: "-0.011em",
                  margin: 0,
                }}
              >
                Такої сторінки не існує
              </h2>
              <p
                className="text-black"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: 1.5,
                  letterSpacing: "-0.011em",
                  margin: 0,
                }}
              >
                Але ви зможете перейти на головну сторінку
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center text-[#F5F3EE] transition-colors duration-200 hover:bg-[#00452a] active:scale-95"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: 20,
                lineHeight: 1.5,
                letterSpacing: "-0.011em",
                background: "#005B33",
                borderRadius: 65,
                padding: "10px 20px",
                width: 276,
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              Перейти на головну
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

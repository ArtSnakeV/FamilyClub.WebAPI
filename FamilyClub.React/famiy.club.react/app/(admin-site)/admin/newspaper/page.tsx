export default async function Newspaper() {
    return (
        <div className="relative w-full min-h-screen text-[var(--foreground-primary)]">
            <span className="relative z-10">Newspaper</span>
            <div
                className="absolute overflow-hidden"
                style={{
                    width: "1492.88px",
                    height: "1062.04px",
                }}
            >
                <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none admin-parchment-bg bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/entities/main_field_background.svg')",
                    }}
                />
            </div>
        </div>
    );
}

export default function EmptyDiv() {
    return (
        <div className="relative w-[78.3vw] max-w-full h-auto min-h-[900px] rounded-1xl text-center overflow-hidden">
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none admin-parchment-bg"
                style={{
                    backgroundImage: "url('/images/usersPageAdmin/Rectangle 793.png')",
                    backgroundSize: "100% 100%",
                }}
            />
            <p className="relative z-10 text-lg text-[var(--color-muted-fg)] mt-[10vh]">
                Користувачів немає
            </p>
        </div>
    );
}

export default function RolesInfoCard() {
    return (
        <div className="relative flex-1 min-w-[380px] max-w-[600px] rounded-[10px] overflow-hidden">
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none admin-parchment-bg"
                style={{
                    backgroundImage:
                        "url('/images/usersPageAdmin/Rectangle 793.png')",
                    backgroundSize: "100% 100%",
                }}
            />
            <div className="relative z-10 p-8 flex flex-col gap-8 text-[var(--foreground-primary)]">
                <h2 className="text-[32px] font-semibold">
                    Про ролі менеджерів
                </h2>

                <div className="flex gap-4 items-start">
                    <img
                        src="/images/addManagerPageAdmin/user-secret-solid-full 1.svg"
                        alt=""
                        className="w-[80px] h-[80px] object-contain shrink-0"
                    />
                    <div>
                        <p className="font-semibold text-[var(--color-green)] text-[18px]">
                            Адмін
                        </p>
                        <p className="text-sm mt-1 text-[var(--color-muted-fg)]">
                            Повний доступ до всіх розділів системи. Може
                            керувати користувачами, налаштуваннями та безпекою.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 items-start">
                    <img
                        src="/images/addManagerPageAdmin/user-tie-solid-full (2) 1.png"
                        alt=""
                        className="w-[80px] h-[80px] object-contain shrink-0"
                    />
                    <div>
                        <p className="font-semibold text-[var(--color-green)] text-[18px]">
                            Менеджер
                        </p>
                        <p className="text-sm mt-1 text-[var(--color-muted-fg)]">
                            Доступ до замовлень і базових інструментів для
                            роботи клієнта.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

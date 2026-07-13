export default function RolesInfoCard() {
    return (
        <div className="bg-[var(--color-white,#F7F5F1)] rounded-[10px] p-8 flex-1 min-w-[380px] max-w-[600px] flex flex-col gap-8">
            <h2 className="text-[32px] font-semibold text-[var(--color-black)]">
                Про ролі менеджерів
            </h2>

            <div className="flex gap-4 items-start">
                <img
                    src="/images/addManagerPageAdmin/user-secret-solid-full 1.svg"
                    alt=""
                    className="w-[80px] h-[80px] object-contain shrink-0"
                />
                <div>
                    <p className="font-semibold text-[var(--color-green)] text-[18px]">Адмін</p>
                    <p className="text-sm text-[var(--color-black)] mt-1">
                        Повний доступ до всіх розділів системи. Може керувати користувачами,
                        налаштуваннями та безпекою.
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
                    <p className="font-semibold text-[var(--color-green)] text-[18px]">Менеджер</p>
                    <p className="text-sm text-[var(--color-black)] mt-1">
                        Доступ до замовлень і базових інструментів для роботи клієнта.
                    </p>
                </div>
            </div>
        </div>
    );
}
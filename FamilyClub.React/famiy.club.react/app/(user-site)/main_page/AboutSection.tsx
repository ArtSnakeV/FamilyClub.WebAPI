export default function AboutSection() {
    return (
        <section className="relative z-10 pt-16 pb-0">
            <div className="mx-auto max-w-[1920px]">
                <div className="relative mx-auto w-full max-w-[1260px] overflow-hidden border-[15px] border-[#f5f3ee] bg-[#f5f3ee] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.9)]">
                    <img
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-20"
                        src="/images/body/Rectangle%20287.png"
                    />
                    <div className="relative px-6 py-10 md:px-[85px]">
                        <div className="grid gap-10 md:grid-cols-[460px_460px] md:gap-[170px]">
                            <div>
                                <h3 className="font-mono text-[36px] font-semibold text-[#242424]">Великий вибір</h3>
                                <p className="mt-4 text-[20px] leading-[1.6] text-justify">
                                    У нас зібрані книги на будь-який смак — від легких романів до глибоких історій,
                                    від популярних новинок до перевіреної класики.
                                    <br />
                                    <br />
                                    Обирай жанр, формат і настрій — і знаходь саме ту книгу, яка тобі зараз потрібна.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-mono text-[32px] font-semibold text-[#242424]">Акції</h3>
                                <p className="mt-4 text-[20px] leading-[1.6] text-justify">
                                    Читати більше — простіше, ніж здається.
                                    <br />
                                    <br />
                                    Знижки та спеціальні пропозиції допоможуть відкривати нові книги частіше і з
                                    задоволенням.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <img
                                alt="Твій дім книг"
                                className="w-full max-w-[1472px] rotate-[-1.5deg] rounded-[30px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.95)]"
                                src="/images/body/Rectangle%20294.png"
                            />
                        </div>

                        <div className="mx-auto mt-10 max-w-[1090px] text-[20px] leading-[1.6] text-justify">
                            <p>
                                Цей сайт — це місце, де книги знаходять своїх читачів.
                                <br />
                                <br />
                                Ми створили простір, у якому поєднали різні формати читання, зручний пошук і теплу
                                атмосферу бібліотеки, щоб процес вибору був не лише простим, а й приємним. Тут немає
                                випадкових рішень — кожна деталь допомагає тобі швидше знайти саме ту історію, яка
                                зачепить.
                                <br />
                                <br />
                                Ти можеш спокійно досліджувати, відкривати нові жанри, повертатися до улюблених книг або
                                зберігати ті, до яких хочеться повернутися пізніше. Це місце, де не потрібно поспішати —
                                лише обирати у своєму ритмі.
                                <br />
                                <br />
                                А якщо ти не знаєш, з чого почати — це теж нормально. Поруч завжди є підказка, яка
                                допоможе знайти щось нове, несподіване або саме те, що зараз потрібно.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
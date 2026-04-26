import cat from "@/public/images/body/cat.png";

export default function AboutSection() {
    return (
        <section className="px-8 py-16 space-y-16">

            {/* 1. Кіт + текст */}
            <div className="grid grid-cols-2 gap-10 items-center">
                <div className="p-2 bg-white rotate-[-2deg] inline-block">
                    <img src={cat.src} alt="Cat" className="w-full h-auto rounded-xl" />
                </div>
                {/*<div className="h-[250px] bg-[url('/images/main_page/cat.png')] bg-cover rounded-xl" />*/}

                <div>
                    <h3 className="text-xl font-semibold mb-2">
                        Ink — це тихий помічник
                    </h3>
                    <p className="text-gray-600">
                        Ми допомагаємо знайти саме ті книги, які тобі потрібні.
                    </p>
                </div>
            </div>

            <div className="bg-white shadow rounded-2xl p-8 grid grid-cols-2 gap-10">
                <div>
                    <h4 className="font-semibold mb-2">Великий вибір</h4>
                    <p className="text-sm text-gray-600">
                        Ти знайдеш книги на будь-який смак.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Акції</h4>
                    <p className="text-sm text-gray-600">
                        Регулярні знижки та спеціальні пропозиції.
                    </p>
                </div>
            </div>

            <div className="bg-green-100 rounded-2xl p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                    Твій дім книг 📚
                </h2>

                <div className="w-20 h-20 bg-green-300 rounded-xl" />
            </div>

            <div className="max-w-3xl text-gray-700">
                <p>
                    Тут ти знайдеш усе: від класики до сучасних бестселерів.
                    Ми створили місце, де книги знаходять тебе.
                </p>
            </div>

            <div className="flex gap-6">
                <div className="w-40 h-40 bg-gray-300 rotate-[-5deg] rounded" />
                <div className="w-40 h-40 bg-gray-300 rotate-[5deg] rounded" />
            </div>

            <div className="bg-green-700 text-white p-10 rounded-2xl grid grid-cols-4 text-center gap-6">
                <div>📚<p>Велика бібліотека</p></div>
                <div>🚚<p>Доставка</p></div>
                <div>💸<p>Знижки</p></div>
                <div>🎁<p>Подарунки</p></div>
            </div>

        </section>
    );
}
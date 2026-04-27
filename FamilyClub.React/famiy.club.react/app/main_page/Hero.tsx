export default function Hero() {
    return (
        <section className="relative h-[400px] bg-[url('/images/body/Banner.png')] bg-cover bg-center text-white">
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 p-10">
                <h1 className="text-4xl font-bold">
                    Нова твоя онлайн-бібліотека
                </h1>
                <button className="mt-4 bg-green-600 px-6 py-2 rounded-lg">
                    Підписатись
                </button>
            </div>
        </section>
    );
}
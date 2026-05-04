export default function InkSection() {
    return (
        <section className="py-16">
            <div className="mx-auto grid max-w-[1220px] items-center gap-10 px-4 lg:grid-cols-[auto,1fr]">
                <div className="flex justify-center lg:justify-start">
                    <img
                        alt="Ink — це тихий помічник"
                        className="w-[min(820px,100%)] rotate-[-2deg] rounded-[6px] shadow-[0px_0px_15px_rgba(0,0,0,0.6)]"
                        src="/images/body/cat.png"
                    />
                </div>

                <div className="max-w-[590px] text-[#242424]">
                    <p className="font-sans text-[32px] font-bold leading-[1.2] text-[#407b61]">
                        Ink — це тихий помічник
                    </p>
                    <p className="font-sans text-[32px] font-bold leading-[1.2] text-[#407b61]">
                        і провідник у світі книг.
                    </p>
                    <p className="mt-4 text-[20px] leading-[1.6]">
                        Він завжди поруч, щоб допомогти знайти саме ту історію, яка тобі підійде.
                    </p>
                    <p className="mt-4 text-[20px] leading-[1.6]">
                        <span className="font-semibold">Ink не говорить, але розуміє тебе:</span> підкаже, що
                        почитати, допоможе з пошуком і зробить вибір простішим.
                    </p>
                    <p className="mt-4 text-[20px] leading-[1.6]">
                        Просто натисни на <span className="font-semibold">дзвіночок</span> — і він з'явиться,
                        коли це потрібно.
                    </p>
                </div>
            </div>
        </section>
    );
}

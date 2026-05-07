export default function InkSection() {
    return (
        <section className="py-16">
            <div className="mx-auto max-w-[1504px] px-4 lg:px-0">
                <div className="grid items-center gap-10 lg:grid-cols-[832px_590px] lg:gap-[82px]">
                    <div className="flex justify-center lg:justify-start">
                        <div className="rotate-[-2deg] border-[20px] border-[#f5f3ee] shadow-[0px_0px_15px_rgba(0,0,0,0.6)]">
                            <img
                                alt="Ink — це тихий помічник"
                                className="h-[571px] w-[832px] object-cover"
                                src="/images/body/cat.png"
                            />
                        </div>
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
            </div>
        </section>
    );
}

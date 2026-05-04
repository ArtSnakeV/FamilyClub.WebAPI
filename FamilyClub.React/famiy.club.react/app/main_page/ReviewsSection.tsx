const reviews = [
    {
        text: "Яскрава, жива історія про свободу та кохання у Нью-Йорку 40-х. Неймовірна атмосфера!",
    },
    {
        text: "Я не просто прочитала цю книгу, я прожила її разом із Лу та Віллом. Це історія не про банальне кохання, а про складний вибір, про те, як одна людина може змінити весь твій світ, навіть якщо ваші шляхи перетнулися за трагічних обставин.",
    },
    {
        text: "Ця книга — справжній струс для мозку. Навіть через десятки років після написання вона вражає тим, наскільки точно автор передав механізми маніпуляції та контролю.",
    },
    {
        text: "Сюжет жорстокий і безжальний, але за горами металу та крові ховається неймовірна психологічна глибина та трагедія.",
    },
];

type ReviewCardProps = {
    text: string;
};

function ReviewCard({ text }: ReviewCardProps) {
    return (
        <div className="flex h-full flex-col gap-3 rounded-[21px] bg-[#f5f3ee] p-4 shadow-[0px_0px_15px_0px_rgba(0,0,0,0.6)]">
            <div className="flex gap-4">
                <img alt="" className="h-[80px] w-[80px]" src="/images/main_page/reviews/reviews-avatar.png" />
                <div className="flex-1">
                    <p className="font-mono text-[24px] font-medium text-[#242424]">Олена В.</p>
                    <p className="mt-2 text-[14px] text-[#242424]">{text}</p>
                </div>
                <img
                    alt=""
                    className="h-[108px] w-[77px] rounded-[9px] object-cover"
                    src="/images/main_page/reviews/reviews-book.png"
                />
            </div>
            <div className="flex items-center justify-between">
                <span className="text-[14px] font-medium text-[#242424]">15 хв тому</span>
                <div className="flex items-center gap-2">
                    <span className="text-[16px] text-[#242424]">798</span>
                    <img alt="" className="h-[30px] w-[30px]" src="/images/main_page/icons/reviews-heart.png" />
                </div>
            </div>
        </div>
    );
}

export default function ReviewsSection() {
    const expandedReviews = [...reviews, ...reviews];

    return (
        <section className="py-16">
            <div className="relative mx-auto max-w-[1920px]">
                <div className="relative border-[20px] border-[#f5f3ee] shadow-[0px_0px_40px_0px_rgba(0,0,0,0.7)]">
                    <img
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-20"
                        src="/images/body/Rectangle%20287.png"
                    />
                    <div className="relative grid gap-6 px-6 py-8 md:grid-cols-2 lg:grid-cols-4">
                        {expandedReviews.map((review, index) => (
                            <ReviewCard key={`${review.text}-${index}`} text={review.text} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

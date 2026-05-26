import BookCard from "./BookCard";

type Book = {
    title: string;
    author?: string | null;
    price: string;
    image?: string | null;
    rating?: number | null;
};

type BookSectionProps = {
    title: string;
    books: Book[];
    showMore?: boolean;
    pillWidth?: number;
};

export default function BookSection({ title, books, showMore = false, pillWidth }: BookSectionProps) {
    return (
        <section className="py-16">
            <div className="mx-auto max-w-[1220px] px-4 lg:px-0">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div
                        className="flex h-[57px] items-center justify-center rounded-t-[10px] rounded-b-[30px] bg-[#f5f3ee] px-6 shadow-[0px_8px_8.5px_0px_rgba(0,0,0,0.5)]"
                        style={pillWidth ? { width: `${pillWidth}px` } : undefined}
                    >
                        <h2 className="font-mono text-[32px] font-bold text-[#242424] md:text-[40px]">
                            {title}
                        </h2>
                    </div>
                    {showMore && (
                        <button className="h-[55px] w-[150px] rounded-b-[25px] bg-[#f5f3ee] text-[24px] shadow-[0px_3px_2.7px_0px_rgba(0,0,0,0.3)]">
                            Більше
                        </button>
                    )}
                </div>

                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-[75px] lg:grid-cols-4 lg:gap-[60px]">
                    {books.map((book, index) => (
                        <BookCard key={`${book.title}-${index}`} {...book} />
                    ))}
                </div>
            </div>
        </section>
    );
}
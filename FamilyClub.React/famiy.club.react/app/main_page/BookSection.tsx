import BookCard from "./BookCard";

const books = Array(6).fill({
    title: "Назва книги",
    price: "120 грн",
});

export default function BookSection({ title }: { title: string }) {
    return (
        <section className="px-8 py-10">
            <h2 className="text-2xl font-semibold mb-6">{title}</h2>

            <div className="grid grid-cols-6 gap-4">
                {books.map((book, i) => (
                    <BookCard key={i} {...book} />
                ))}
            </div>
        </section>
    );
}
import { ProductDto } from "@/lib/api/generated";

type Props = {
  books: ProductDto[];
};

export default function BookGrid({ books }: Props) {
  if (books.length === 0) {
    return <p>Нічого не знайдено</p>;
  }

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          {book.productName} —{" "}
          {book.publishingDate
            ? new Date(book.publishingDate).getFullYear()
            : "рік невідомий"}
        </li>
      ))}
    </ul>
  );
}
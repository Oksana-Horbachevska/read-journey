import { Book } from "@/types/book";
import css from "./RecommendedList.module.css";
import Image from "next/image";

interface RecommendedListProps {
  books: Book[];
}
export default function RecommendedList({ books }: RecommendedListProps) {
  return (
    <ul className={css.bookList}>
      {books?.map((book) => (
        <li className={css.bookItem} key={book._id}>
          <Image
            className={css.bookImage}
            src={book.imageUrl}
            alt={book.title}
            width={137}
            height={208}
          />
          <h3 className={css.bookTitle}>{book.title}</h3>
          <p className={css.bookAuthor}>{book.author}</p>
        </li>
      ))}
    </ul>
  );
}

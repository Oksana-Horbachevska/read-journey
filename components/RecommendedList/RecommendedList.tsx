import { Book } from "@/types/book";
import css from "./RecommendedList.module.css";

interface RecommendedListProps {
  books: Book[];
}
export default function RecommendedList({ books }: RecommendedListProps) {
  return (
    <div className={css.booksWrapper}>
      <ul className={css.booksList}>
        {books?.map((book) => (
          <li className={css.bookItem} key={book._id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

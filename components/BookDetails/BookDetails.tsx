"use client";

import { Book } from "@/types/book";
import css from "./BookDetails.module.css";
import Image from "next/image";

interface BookDetailsProps {
  book: Book;
  onAdd: (id: string) => void;
  isPending: boolean;
}

export default function BookModal({
  book,
  onAdd,
  isPending,
}: BookDetailsProps) {
  return (
    <div className={css.wrapper}>
      <div className={css.contentWrapper}>
        <div className={css.imageWrapper}>
          <Image
            src={book.imageUrl}
            alt={book.title}
            className={css.bookImage}
            width={153}
            height={233}
          ></Image>
        </div>

        <h3 className={css.bookTitle}>{book.title}</h3>
        <p className={css.bookAuthor}>{book.author}</p>
        <p className={css.bookTotalPage}>{book.totalPages} pages</p>
      </div>
      <button
        type="button"
        className={css.button}
        onClick={() => onAdd(book._id)}
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add to library"}
      </button>
    </div>
  );
}

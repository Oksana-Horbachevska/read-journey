"use client";

import { Book } from "@/types/book";
import Image from "next/image";
import { useState } from "react";
import Modal from "../Modal/Modal";
import BookDetails from "@/components/BookDetails/BookDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiErrorData } from "@/types/auth";
import toast from "react-hot-toast";
import css from "./OwnBookList.module.css";
import { removeBookById } from "@/lib/api/clientApi";

interface OwnBookListProp {
  books: Book[];
}
export default function OwnBookList({ books }: OwnBookListProp) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => removeBookById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ownBooks"] });
      setSelectedBook(null);
      toast.success("Book removed successfully");
    },
    onError: (error: AxiosError<ApiErrorData>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Error of removing book";
      toast.error(errorMessage);
    },
  });

  const handleRemoveBook = (id: string) => {
    mutate(id);
  };

  return (
    <div>
      <ul className={css.bookList}>
        {books?.map((book) => (
          <li className={css.bookItem} key={book._id}>
            <div
              className={css.imageWrapper}
              onClick={() => setSelectedBook(book)}
            >
              <Image
                className={css.bookImage}
                src={book.imageUrl}
                alt={book.title}
                width={137}
                height={208}
              />
            </div>
            <div className={css.bookContenWrapper}>
              <div className={css.titleWrapper}>
                <h3 className={css.bookTitle}>{book.title}</h3>
                <p className={css.bookAuthor}>{book.author}</p>
              </div>
              <button
                type="button"
                className={css.deleteBtn}
                onClick={() => handleRemoveBook(book._id)}
                disabled={isPending}
              >
                <svg className={css.deleteSvg} width="14" height="14">
                  <use href="/sprite.svg#icon-trash-2" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal isOpen={!!selectedBook} onClose={() => setSelectedBook(null)}>
        {selectedBook && <BookDetails book={selectedBook} variant="read" />}
      </Modal>
    </div>
  );
}

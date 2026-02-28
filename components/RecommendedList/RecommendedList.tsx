"use client";

import { Book } from "@/types/book";
import css from "./RecommendedList.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import BookDetails from "@/components/BookDetails/BookDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBookById } from "@/lib/api/clientApi";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import { AxiosError } from "axios";
import { ApiErrorData } from "@/types/auth";
import toast from "react-hot-toast";

interface RecommendedListProps {
  books: Book[];
}
export default function RecommendedList({ books }: RecommendedListProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => addBookById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setSelectedBook(null);

      setIsSuccessModalOpen(true);
    },
    onError: (error: AxiosError<ApiErrorData>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Error of adding book";
      toast.error(errorMessage);
    },
  });

  useEffect(() => {
    if (isSuccessModalOpen) {
      const timer = setTimeout(() => {
        setIsSuccessModalOpen(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccessModalOpen]);

  const handleAddBook = async (id: string) => {
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
            <h3 className={css.bookTitle}>{book.title}</h3>
            <p className={css.bookAuthor}>{book.author}</p>
          </li>
        ))}
      </ul>

      <Modal isOpen={!!selectedBook} onClose={() => setSelectedBook(null)}>
        {selectedBook && (
          <BookDetails
            book={selectedBook}
            onAdd={handleAddBook}
            isPending={isPending}
          />
        )}
      </Modal>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      >
        <SuccessMessage />
      </Modal>
    </div>
  );
}

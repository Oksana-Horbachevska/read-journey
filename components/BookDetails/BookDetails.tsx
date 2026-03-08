import { Book } from "@/types/book";
import css from "./BookDetails.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BookDetailsProps {
  book: Book;
  onAdd?: (id: string) => void;
  isPending?: boolean;
  isAdded?: boolean;
  variant?: "add" | "read";
}

export default function BookDetails({
  book,
  onAdd,
  isPending,
  isAdded = false,
  variant = "add",
}: BookDetailsProps) {
  const router = useRouter();

  const isButtonDisabled = isPending || isAdded;

  const handleAction = () => {
    if (variant === "read") {
      router.push(`/reading/${book._id}`);
    } else if (onAdd) {
      onAdd(book._id);
    }
  };
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
        onClick={handleAction}
        disabled={isButtonDisabled}
      >
        {variant === "read"
          ? "Start reading"
          : isAdded
            ? "Already in library"
            : isPending
              ? "Adding..."
              : "Add to library"}
      </button>
    </div>
  );
}

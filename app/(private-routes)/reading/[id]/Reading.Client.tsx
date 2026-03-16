"use client";

import { fetchBookById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./Reading.module.css";
import Image from "next/image";

export default function ReadingPageClient() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookById(id as string),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Book not found</p>;

  const isReading = !!data.progress?.find((s) => s.status === "active");

  return (
    <div className={css.wrapper}>
      <Image
        width={224}
        height={340}
        alt={data.title}
        src={data.imageUrl}
        className={css.bookImage}
      ></Image>
      <h3 className={css.bookTitle}>{data.title}</h3>
      <p className={css.bookAuthor}>{data.author}</p>
      <button className={css.readingBtn}>
        <span className={isReading ? css.innerStop : css.innerStart}></span>
      </button>
    </div>
  );
}

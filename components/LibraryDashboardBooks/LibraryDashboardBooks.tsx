"use client";

import Link from "next/link";
import RecommendedList from "../RecommendedList/RecommendedList";
import css from "./LibraryDashboardBooks.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/lib/api/serverApi";
import { useEffect, useState } from "react";

export default function LibraryDashboardBooks() {
  const [randomPage] = useState(() => Math.floor(Math.random() * 10) + 1);

  const params = {
    page: randomPage,
    limit: 3,
    title: "",
    author: "",
  };

  const { data, isLoading } = useQuery({
    queryKey: ["books", params, randomPage],
    queryFn: () => fetchBooks(params),
    enabled: !!randomPage,
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Recommended books</h3>
      <RecommendedList books={data?.results || []} variant="sidebar" />
      <div className={css.linkWrapper}>
        <Link href="/recommended" className={css.link}>
          Home
        </Link>
        <Link href="/recommended">
          <svg className={css.icon} width="24" height="24">
            <use href="/sprite.svg#icon-log-in" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

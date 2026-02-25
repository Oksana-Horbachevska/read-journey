"use client";

import { fetchBooks } from "@/lib/api/serverApi";
import RecommendedList from "../RecommendedList/RecommendedList";
import css from "./RecommendedBooks.module.css";
import { useQuery } from "@tanstack/react-query";

export default function RecommendedBooks() {
  const params = { page: 1, limit: 10 };

  const { data } = useQuery({
    queryKey: ["books", params],
    queryFn: () => fetchBooks(params),
  });
  return (
    <div className={css.section}>
      <div className={css.titleWrapper}>
        <h2 className={css.title}>Recommended</h2>
        <div className={css.paginationWrapper}>
          <button className={css.prevBtn}>
            <svg className={css.prevSvg} width="20" height="20">
              <use href="/sprite.svg#icon-chevron-left" />
            </svg>
          </button>

          <button className={css.nextBtn}>
            <svg className={css.nextSvg} width="20" height="20">
              <use href="/sprite.svg#icon-chevron-right" />
            </svg>
          </button>
        </div>
      </div>
      <RecommendedList books={data?.results || []} />
    </div>
  );
}

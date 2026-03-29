"use client";

import { fetchBooks } from "@/lib/api/serverApi";
import RecommendedList from "../RecommendedList/RecommendedList";
import css from "./RecommendedBooks.module.css";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RecommendedBooks() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setLimit(2);
      }
      if (width < 1440) {
        setLimit(8);
      } else {
        setLimit(10);
      }
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  const currentPage = Number(searchParams.get("page")) || 1;
  const title = searchParams.get("title") || "";
  const author = searchParams.get("author") || "";
  const params = {
    page: currentPage,
    limit,
    title,
    author,
  };

  const { data } = useQuery({
    queryKey: ["books", params],
    queryFn: () => fetchBooks(params),
    placeholderData: (previousData) => previousData,
  });
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", newPage.toString());

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${window.location.pathname}${query}`);
  };
  return (
    <div className={css.section}>
      <div className={css.titleWrapper}>
        <h2 className={css.title}>Recommended</h2>
        <div className={css.paginationWrapper}>
          <button
            className={css.prevBtn}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <svg className={css.prevSvg} width="20" height="20">
              <use href="/sprite.svg#icon-chevron-left" />
            </svg>
          </button>

          <button
            className={css.nextBtn}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
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

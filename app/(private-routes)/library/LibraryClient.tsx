"use client";

import { fetchBooksOwn } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import css from "./Library.module.css";
import OwnBooksSelect from "@/components/OwnBooksSelect/OwnBooksSelect";
import OwnBookList from "@/components/OwnBookList/OwnBookList";
import LibraryInfo from "@/components/LibraryInfo/LibraryInfo";

export default function LibraryClientPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "";
  const params = {
    status,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["ownBooks", status],
    queryFn: () => fetchBooksOwn(params),
    placeholderData: (previousData) => previousData,
  });

  const hasBooks = data && data.length > 0;
  return (
    <section className={css.section}>
      <div className={css.titleWrapper}>
        <h2 className={css.title}>My library</h2>
        <OwnBooksSelect />
      </div>
      <div className={`${css.contentWrapper} ${!hasBooks ? css.empty : ""}`}>
        {!isLoading && !hasBooks ? (
          <LibraryInfo />
        ) : (
          <OwnBookList books={data || []} />
        )}
      </div>
    </section>
  );
}

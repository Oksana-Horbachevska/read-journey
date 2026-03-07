"use client";

import { fetchBooksOwn } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import css from "./Library.module.css";
import OwnBooksSelect from "@/components/OwnBooksSelect/OwnBooksSelect";
import OwnBookList from "@/components/OwnBookList/OwnBookList";

export default function LibraryClientPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "";
  const params = {
    status,
  };

  const { data } = useQuery({
    queryKey: ["ownBooks", status],
    queryFn: () => fetchBooksOwn(params),
    placeholderData: (previousData) => previousData,
  });
  return (
    <section className={css.section}>
      <div className={css.titleWrapper}>
        <h2 className={css.title}>My library</h2>
        <OwnBooksSelect />
      </div>
      <OwnBookList books={data || []} />
    </section>
  );
}

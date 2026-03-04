"use client";

import { useForm } from "react-hook-form";
import css from "./RecommendedDashboardFilter.module.css";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface FilterFields {
  title: string;
  author: string;
}

export default function RecommendedDashboardFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, handleSubmit } = useForm<FilterFields>({
    defaultValues: {
      title: searchParams.get("title") || "",
      author: searchParams.get("author") || "",
    },
  });

  function onSubmit(data: FilterFields) {
    const params = new URLSearchParams(searchParams.toString());

    if (data.title.trim()) {
      params.set("title", data.title.trim());
    } else {
      params.delete("title");
    }
    if (data.author.trim()) {
      params.set("author", data.author.trim());
    } else {
      params.delete("author");
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Filters:</h3>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputWrapper}>
          <span className={css.labelPrefix}>Book title:</span>
          <input
            className={css.input}
            type="text"
            placeholder=""
            {...register("title")}
          />
        </div>
        <div className={css.inputWrapper}>
          <span className={css.labelPrefix}>The author:</span>
          <input
            className={css.input}
            type="text"
            placeholder=""
            {...register("author")}
          />
        </div>
        <button type="submit" className={css.button}>
          To apply
        </button>
      </form>
    </div>
  );
}

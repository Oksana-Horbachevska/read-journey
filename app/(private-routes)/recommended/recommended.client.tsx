"use client";

import RecommendedList from "@/components/RecommendedList/RecommendedList";
import css from "./Recommended.module.css";

export default function RecommendedClient() {
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
      <RecommendedList />;
    </div>
  );
}

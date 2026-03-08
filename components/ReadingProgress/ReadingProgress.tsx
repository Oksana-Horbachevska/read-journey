import { Book } from "@/types/book";
import { useState } from "react";
import ProgressInfo from "../ProgressInfo/ProgressInfo";
import css from "./ReadingProgress.module.css";
import ProgressDiary from "../ProgressDiary/ProgressDiary";
import ProgressStatistics from "../ProgressStatistics/ProgressStatistics";

interface ReadingProgressProps {
  book: Book;
}

export default function ReadingProgress({ book }: ReadingProgressProps) {
  const [view, setView] = useState<"diary" | "statistics">("diary");

  const hasProgress = book.progress && book.progress.length > 0;

  if (!hasProgress) {
    return <ProgressInfo />;
  }

  return (
    <div className={css.container}>
      <div className={css.titleWrapper}>
        <h3 className={css.title}>
          {view === "diary" ? "Diary" : "Statistics"}
        </h3>
        <div className={css.viewSwitchers}>
          <button
            className={`${css.viewBtn} ${view === "diary" ? css.active : ""}`}
            onClick={() => setView("diary")}
          >
            <svg className={css.icon} width={20} height={20}>
              <use href="/sprite.svg#icon-hourglass-01" />
            </svg>
          </button>
          <button
            className={`${css.viewBtn} ${view === "statistics" ? css.active : ""}`}
            onClick={() => setView("statistics")}
          >
            <svg className={css.icon} width={20} height={20}>
              <use href="/sprite.svg#icon-pie-chart-02" />
            </svg>
          </button>
        </div>
      </div>

      {view === "diary" ? (
        <ProgressDiary progress={book.progress} totalPages={book.totalPages} />
      ) : (
        <ProgressStatistics />
      )}
    </div>
  );
}

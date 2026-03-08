import { Book } from "@/types/book";
import { format } from "date-fns";
import css from "./ProgressDiary.module.css";

interface ProgressDiaryProps {
  progress: Book["progress"];
  totalPages: number;
}

export default function ProgressDiary({
  progress,
  totalPages,
}: ProgressDiaryProps) {
  const sortedProgress = [...(progress || [])]
    .filter((s) => s.status === "inactive")
    .reverse();
  return (
    <div className={css.diaryContainer}>
      <ul className={css.list}>
        {sortedProgress.map((session) => {
          const pagesRead = session.finishPage - session.startPage + 1;
          const percent = ((pagesRead / totalPages) * 100).toFixed(2);

          // Formate date
          const dateLabel = format(
            new Date(session.finishReading),
            "dd.MM.yyyy",
          );
          console.log("Progress array:", progress);
          return (
            <li key={session._id} className={css.item}>
              {/* Біла/сіра мітка зліва */}
              <div className={css.marker}></div>

              <div className={css.content}>
                <div className={css.topRow}>
                  <span className={css.date}>{dateLabel}</span>
                  <span className={css.pagesCount}>{pagesRead} pages</span>
                </div>

                <div className={css.detailsRow}>
                  <div className={css.leftStats}>
                    <p className={css.percent}>{percent}%</p>
                    <p className={css.minutes}>
                      {/* Тут можна додати розрахунок часу в хвилинах */}
                      29 minutes
                    </p>
                  </div>

                  <div className={css.rightStats}>
                    <div className={css.chartPlaceholder}>
                      {/* Маленька зелена іконка графіка з макету */}
                      <div className={css.miniGraph}></div>
                    </div>
                    <div className={css.speedInfo}>
                      <p className={css.speed}>
                        {session.speed} pages per hour
                      </p>
                      <button className={css.deleteBtn} type="button">
                        <svg width={14} height={14}>
                          <use href="/sprite.svg#icon-trash-03" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

"use client";

import { Book, ProgressReading } from "@/types/book";
import { format } from "date-fns";
import css from "./ProgressDiary.module.css";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReadingSession } from "@/lib/api/clientApi";

interface ProgressDiaryProps {
  progress: Book["progress"];
  totalPages: number;
  bookId: string;
}

interface GroupedProgress {
  date: string;
  totalDailyPages: number;
  sessions: ProgressReading[];
}

export default function ProgressDiary({
  progress,
  totalPages,
  bookId,
}: ProgressDiaryProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (readingId: string) =>
      deleteReadingSession({ bookId, readingId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book", bookId] });
    },
  });

  const groupedData: GroupedProgress[] = (progress || [])
    .filter((s) => s.status === "inactive")
    .reduce((acc: GroupedProgress[], session) => {
      const dateKey = format(new Date(session.finishReading), "dd.MM.yyyy");
      const pagesInSession = session.finishPage - session.startPage + 1;

      const existingDay = acc.find((day) => day.date === dateKey);

      if (existingDay) {
        existingDay.totalDailyPages += pagesInSession;
        existingDay.sessions.push(session);
      } else {
        acc.push({
          date: dateKey,
          totalDailyPages: pagesInSession,
          sessions: [session],
        });
      }
      return acc;
    }, [])
    .reverse();

  return (
    <div className={css.diaryContainer}>
      <ul className={css.dayList}>
        {groupedData.map((day, dayIndex) => {
          return (
            <li key={day.date} className={css.dayItem}>
              <div
                className={`${css.marker} ${dayIndex === 0 ? css.activeMarker : ""}`}
              ></div>

              <div className={css.content}>
                <div className={css.topRow}>
                  <span
                    className={`${css.date} ${dayIndex === 0 ? css.activeDate : ""}`}
                  >
                    {day.date}
                  </span>
                  <span className={css.pagesCount}>
                    {day.totalDailyPages} pages
                  </span>
                </div>

                <ul className={css.sessionsList}>
                  {day.sessions.reverse().map((session) => {
                    const pagesRead =
                      session.finishPage - session.startPage + 1;
                    const percent = ((pagesRead / totalPages) * 100).toFixed(2);

                    const start = new Date(session.startReading).getTime();
                    const finish = new Date(session.finishReading).getTime();
                    const minutes = Math.round((finish - start) / 60000) || 1;
                    return (
                      <li key={session._id} className={css.sessionItem}>
                        <div className={css.leftStats}>
                          <p className={css.percent}>{percent}%</p>
                          <p className={css.minutes}>
                            {minutes}
                            minutes
                          </p>
                        </div>

                        <div className={css.rightStats}>
                          <div className={css.speedWrapper}>
                            <div className={css.miniGraph}>
                              <Image
                                width={59}
                                height={25}
                                src="/images/Notifications/miniGraph.png"
                                alt="reading speed graph"
                              ></Image>
                            </div>
                            <button
                              className={css.deleteBtn}
                              type="button"
                              onClick={() => mutation.mutate(session._id)}
                              disabled={mutation.isPending}
                            >
                              <svg
                                width={14}
                                height={14}
                                className={css.deleteBtnSvg}
                              >
                                <use href="/sprite.svg#icon-trash-2" />
                              </svg>
                            </button>
                          </div>

                          <div className={css.speedInfo}>
                            <p className={css.speed}>
                              {session.speed} pages per hour
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

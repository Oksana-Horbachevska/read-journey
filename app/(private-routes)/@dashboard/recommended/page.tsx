import Dashboard from "@/components/Dashboard/Dashboard";
import RecommendedDashboardContent from "@/components/RecommendedDashboard/RecommendedDashboard";
import css from "./RecomendedDashbord.module.css";
import Link from "next/link";

export default function RecommendedDashboard() {
  return (
    <Dashboard>
      <RecommendedDashboardContent />
      <div className={css.guideBlock}>
        <h2 className={css.guigeTitle}>Start your workout</h2>
        <ol className={css.guigeList}>
          <li className={css.guigeItem}>
            <span className={css.hilight}>Create a personal library:</span> add
            the books you intend to read to it.
          </li>
          <li className={css.guigeItem}>
            <span className={css.hilight}>Create your first workout:</span>{" "}
            define a goal, choose a period, start training.
          </li>
        </ol>
        <div className={css.linkWrapper}>
          <Link className={css.guideLink} href="/library">
            My library
          </Link>
          <Link href="/library">
            <svg className={css.guideIcon} width="24" height="24">
              <use href="/sprite.svg#icon-log-in" />
            </svg>
          </Link>
        </div>
      </div>
    </Dashboard>
  );
}

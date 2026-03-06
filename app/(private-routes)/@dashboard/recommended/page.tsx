import Dashboard from "@/components/Dashboard/Dashboard";
import RecommendedDashboardFilter from "@/components/RecommendedDashboard/RecommendedDashboardFilter";
import css from "./RecomendedDashboard.module.css";
import Link from "next/link";
import Image from "next/image";

export default function RecommendedDashboardPage() {
  return (
    <Dashboard>
      <RecommendedDashboardFilter />
      <div className={css.guideBlock}>
        <h2 className={css.guideTitle}>Start your workout</h2>
        <ol className={css.guideList}>
          <li className={css.guideItem}>
            <div className={css.guideContent}>
              <span className={css.hilight}>Create a personal library:</span>{" "}
              add the books you intend to read to it.
            </div>
          </li>
          <li className={css.guideItem}>
            <div className={css.guideContent}>
              <span className={css.hilight}>Create your first workout:</span>
              define a goal, choose a period, start training.
            </div>
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
      <div className={css.quoteBlock}>
        <Image
          width={40}
          height={40}
          src="/images/Notifications/Books.png"
          alt="books"
          className={css.quoteImage}
        ></Image>
        <p className={css.quoteText}>
          &ldquo;Books are <span className={css.hilight}>windows</span> to the
          world, and reading is a journey into the unknown.&ldquo;
        </p>
      </div>
    </Dashboard>
  );
}

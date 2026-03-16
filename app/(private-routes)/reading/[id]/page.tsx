import ReadingPageClient from "./Reading.Client";
import css from "./Reading.module.css";

export default function ReadingPage() {
  return (
    <section className={css.section}>
      <h2 className={css.pageTitle}>My reading</h2>
      <div className={css.pageWrapper}>
        <ReadingPageClient />
      </div>
    </section>
  );
}

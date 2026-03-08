import ReadingPageClient from "./Reading.Client";
import css from "./Reading.module.css";

export default function ReadingPage() {
  return (
    <section>
      <h2 className={css.title}>My reading</h2>
      <ReadingPageClient />
    </section>
  );
}

import Image from "next/image";
import css from "./LibraryInfo.module.css";

export default function LibraryInfo() {
  return (
    <div className={css.sectionWrapper}>
      <div className={css.imageWrapper}>
        <Image
          className={css.image}
          width={70}
          height={70}
          alt="books"
          src="/images/Notifications/Books.png"
        ></Image>
      </div>
      <p className={css.text}>
        To start training, add{" "}
        <span className={css.diffText}>some of your books</span> or from the
        recommended ones
      </p>
    </div>
  );
}

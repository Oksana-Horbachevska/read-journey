import Image from "next/image";
import css from "./ProgressInfo.module.css";

export default function ProgressInfo() {
  return (
    <div className={css.sectionWrapper}>
      <h2 className={css.title}>Progress</h2>
      <p className={css.text}>
        Here you will see when and how much you read. To record, click on the
        red button above.
      </p>
      <div className={css.imageWrapper}>
        <Image
          className={css.image}
          width={50}
          height={70}
          alt="star"
          src="/images/Notifications/ProgressInfo.png"
        ></Image>
      </div>
    </div>
  );
}

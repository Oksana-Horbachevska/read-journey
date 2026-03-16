import Image from "next/image";
import css from "./SuccessReadingMessage.module.css";

export default function SuccessReadingMessage() {
  return (
    <div className={css.wrapper}>
      <Image
        className={css.image}
        src="/images/Notifications/Books.png"
        alt="Good job"
        width={68}
        height={70}
      ></Image>
      <h3 className={css.title}>The book is read</h3>
      <p className={css.text}>
        It was an <span className={css.span}>exciting journey</span>, where each
        page revealed new horizons, and the characters became inseparable
        friends.
      </p>
    </div>
  );
}

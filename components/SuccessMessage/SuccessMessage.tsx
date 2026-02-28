import Image from "next/image";
import css from "./SuccessMessage.module.css";

export default function SuccessMessage() {
  return (
    <div className={css.wrapper}>
      <Image
        className={css.image}
        src="/images/Notifications/ThambUP.png"
        alt="Good job"
        width={68}
        height={70}
      ></Image>
      <h3 className={css.title}>Good job</h3>
      <p className={css.text}>
        Your book is now in <span className={css.span}>the library!</span> The
        joy knows no bounds and now you can start your training
      </p>
    </div>
  );
}

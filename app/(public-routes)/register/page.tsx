import Link from "next/link";
import css from "./Register.module.css";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import Image from "next/image";

export default function Register() {
  return (
    <section className={css.section}>
      <div className={css.authPart}>
        <Link href="/">
          <svg className={css.logoIcon} width="182" height="17">
            <use href="/sprite.svg#icon-Logo" />
          </svg>
        </Link>
        <h1 className={css.title}>
          Expand your mind, reading <span className={css.span}>a book</span>
        </h1>
        <RegisterForm />
      </div>
      <div className={css.imagePart}>
        <div className={css.imageWrapper}>
          <Image
            className={css.image}
            src="/images/Hero/iPhone 15 Black desktop-1x.avif"
            alt="iPhone 15 Black"
            width={393}
            height={821}
          ></Image>
        </div>
      </div>
    </section>
  );
}

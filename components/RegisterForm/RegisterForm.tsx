import Link from "next/link";
import css from "./RegisterForm.module.css";

export default function RegisterForm() {
  return (
    <div>
      <form className={css.registerForm}>
        <div className={css.inputWrapper}>
          <span className={css.labelPrefix}>Name:</span>
          <input className={css.input} type="text" placeholder="" />
        </div>
        <div className={css.inputWrapper}>
          <span className={css.labelPrefix}>Mail:</span>
          <input className={css.input} type="email" placeholder="" />
        </div>
        <div className={css.inputWrapper}>
          <span className={css.labelPrefix}>Password:</span>
          <input className={css.input} type="password" placeholder="" />
          <svg className={css.passwordSvg} width="20" height="15">
            <use href="/sprite.svg#icon-eye-off" />
          </svg>
        </div>
      </form>
      <div className={css.btnWrapper}>
        <button type="submit" className={css.authSubmitBtn}>
          Registration
        </button>
        <Link className={css.authLink} href="/login">
          Already have an account?
        </Link>
      </div>
    </div>
  );
}

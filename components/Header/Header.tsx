import Link from "next/link";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/">
        <svg className={css.logoIcon} width="182" height="17">
          <use href="/sprite.svg#icon-Logo" />
        </svg>
      </Link>
      <nav className={css.nav}>
        <ul className={css.navList}>
          <li className={css.navItem}>
            <Link className={css.navLink} href="/recommended">
              Home
            </Link>
          </li>
          <li className={css.navItem}>
            <Link className={css.navLink} href="/library">
              My library
            </Link>
          </li>
        </ul>
      </nav>
      <div className={css.authNav}>
        <div className={css.userWrapper}>
          <div className={css.userIcon}>O</div>
          <div className={css.userName}>Oksana</div>
        </div>
        <button className={css.logoutUser}>Log out</button>
      </div>
    </header>
  );
}

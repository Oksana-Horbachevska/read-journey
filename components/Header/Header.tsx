"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { logoutUser } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function Header() {
  const router = useRouter();
  const { user, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    await logoutUser();
    clearIsAuthenticated();

    router.push("/");
  };

  return (
    <header className={css.header}>
      <Link href="/">
        <svg className={css.logoIcon} width="182" height="17">
          <use href="/sprite.svg#icon-Logo" />
        </svg>
      </Link>
      <nav className={css.userNav}>
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
      <div className={css.userBar}>
        <div className={css.userWrapper}>
          <div className={css.userIcon}>
            {user?.name?.[0].toUpperCase() || "?"}
          </div>
          <div className={css.userName}>{user?.name}</div>
        </div>
        <button className={css.logoutUser} onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  );
}

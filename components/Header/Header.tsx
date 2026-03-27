"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { logoutUser } from "@/lib/api/clientApi";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import MobileMenu from "../MobileMenu/MobileMenu";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    await logoutUser();
    clearIsAuthenticated();

    router.push("/");
  };

  // Close menu if innerWidth >= 767
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 767) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMenuOpen]);

  return (
    <header className={css.header}>
      <Link href="/">
        <svg className={css.logoDesctop} width="182" height="17">
          <use href="/sprite.svg#icon-Logo" />
        </svg>
        <svg className={css.logoMobile} width="42" height="17">
          <use href="/sprite.svg#icon-Logo-short" />
        </svg>
      </Link>
      <nav className={css.desktopNav}>
        <ul className={css.navList}>
          <li className={css.navItem}>
            <Link
              className={`${css.navLink} ${pathname === "/recommended" ? css.active : ""}`}
              href="/recommended"
            >
              Home
            </Link>
          </li>
          <li className={css.navItem}>
            <Link
              className={`${css.navLink} ${pathname === "/library" ? css.active : ""}`}
              href="/library"
            >
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
        <button className={css.burgerBtn} onClick={() => setIsMenuOpen(true)}>
          <svg width="28" height="28" className={css.burgerIcon}>
            <use href="/sprite.svg#icon-menu-04" />
          </svg>
        </button>
      </div>
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onLogout={handleLogout}
      />
    </header>
  );
}

import Link from "next/link";
import css from "./MobileMenu.module.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  onLogout,
}: MobileMenuProps) {
  return (
    <div
      className={`${css.backdrop} ${isOpen ? css.isOpen : ""}`}
      onClick={onClose}
    >
      <div className={css.menuContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg width="28" height="28" className={css.closeIcon}>
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        <nav className={css.nav}>
          <ul className={css.navList}>
            <li className={css.navItem}>
              <Link
                href="/recommended"
                className={css.navLink}
                onClick={onClose}
              >
                Home
              </Link>
            </li>
            <li className={css.navItem}>
              <Link href="/library" className={css.navLink} onClick={onClose}>
                My library
              </Link>
            </li>
          </ul>
        </nav>

        <button className={css.logoutBtn} onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

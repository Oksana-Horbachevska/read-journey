"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "default" | "small";
}

export default function Modal({
  isOpen,
  onClose,
  children,
  size = "default",
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalClass = `${css.modal} ${size === "small" ? css.modalSmall : ""}`;

  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div className={modalClass} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.closeSvg} width="22" height="22">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}

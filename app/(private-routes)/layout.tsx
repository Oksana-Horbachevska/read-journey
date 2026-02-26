import Header from "@/components/Header/Header";
import React from "react";
import css from "@/app/page.module.css";

type Props = {
  children: React.ReactNode;
  dashboard: React.ReactNode;
};

export default function MainLayout({ children, dashboard }: Props) {
  return (
    <div>
      <Header />
      <div className={css.layoutWrapper}>
        <aside className={css.sidebar}>{dashboard}</aside>
        <main className={css.mainContent}>{children}</main>
      </div>
    </div>
  );
}

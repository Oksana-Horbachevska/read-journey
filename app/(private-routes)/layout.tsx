import Header from "@/components/Header/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
  dashboard: React.ReactNode;
};

export default function MainLayout({ children, dashboard }: Props) {
  return (
    <div>
      <Header />
      <aside>{dashboard}</aside>
      <main>{children}</main>
    </div>
  );
}

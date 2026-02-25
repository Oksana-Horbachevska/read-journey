import css from "./Dashboard.module.css";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return <aside className={css.dashboard}>{children}</aside>;
}

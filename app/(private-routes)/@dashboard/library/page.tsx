import AddBook from "@/components/AddBook/AddBook";
import Dashboard from "@/components/Dashboard/Dashboard";
import LibraryDashboardBooks from "@/components/LibraryDashboardBooks/LibraryDashboardBooks";
import css from "./LibraryDashboard.module.css";

export default function LibraryDashboardPage() {
  return (
    <Dashboard>
      <div className={css.sectionWrapper}>
        <AddBook />
        <LibraryDashboardBooks />
      </div>
    </Dashboard>
  );
}

import AddBook from "@/components/AddBook/AddBook";
import Dashboard from "@/components/Dashboard/Dashboard";

import LibraryDashboardBooks from "@/components/LibraryDashboardBooks/LibraryDashboardBooks";

export default function RecommendedDashboardPage() {
  return (
    <Dashboard>
      <AddBook />
      <LibraryDashboardBooks />
    </Dashboard>
  );
}

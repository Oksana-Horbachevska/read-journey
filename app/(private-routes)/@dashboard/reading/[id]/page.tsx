"use client";

import AddReading from "@/components/AddReading/AddReading";
import Dashboard from "@/components/Dashboard/Dashboard";
import ReadingProgress from "@/components/ReadingProgress/ReadingProgress";
import { fetchBookById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function ReadingDashboardPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookById(id as string),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Book not found</p>;

  const activeSession = data?.progress?.find(
    (session) => session.status === "active",
  );
  const isReadingNow = !!activeSession;

  return (
    <Dashboard>
      <AddReading
        key={isReadingNow ? "active" : "inactive"}
        isReading={isReadingNow}
        totalPages={data?.totalPages}
      />
      <ReadingProgress book={data} />
    </Dashboard>
  );
}

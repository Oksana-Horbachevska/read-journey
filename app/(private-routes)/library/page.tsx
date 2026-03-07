import { fetchBooksOwn } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import LibraryClientPage from "./LibraryClient";

export default async function LibraryPage() {
  const queryClient = new QueryClient();
  const status = "";

  const data = await queryClient.prefetchQuery({
    queryKey: ["ownBooks", status],
    queryFn: () => fetchBooksOwn({ status }),
  });
  console.log("Data:", { data });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LibraryClientPage />
    </HydrationBoundary>
  );
}

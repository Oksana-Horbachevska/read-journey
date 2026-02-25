import RecommendedBooks from "@/components/RecommendedBooks/RecommendedBooks";
import { fetchBooks } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Recommended() {
  const queryClient = new QueryClient();
  const params = {
    page: 1,
    perPage: 10,
    title: "",
    author: "",
  };

  await queryClient.prefetchQuery({
    queryKey: ["books"],
    queryFn: () => fetchBooks(params),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecommendedBooks />
    </HydrationBoundary>
  );
}

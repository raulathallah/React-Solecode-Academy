import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllBookSearchPaged } from "../../api/Books";

const PAGE_SIZE = 15;
const fetchInfiniteBooks = async ({ pageParam = 2 }) => {
  console.log({ pageParam });
  const { data } = await getAllBookSearchPaged(
    {
      pageNumber: pageParam,
      perPage: PAGE_SIZE,
    },
    { sortBy: "title", sortOrder: "asc" }
  );

  return data;
};
const InfiniteScrollList = () => {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["infiniteData"],
    queryFn: fetchInfiniteBooks,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < PAGE_SIZE) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  const items = data?.pages.flatMap((page) => page.data) ?? [];

  const isEmpty = items.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data && data.pages[data.pages.length - 1]?.data.length < PAGE_SIZE);

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchNextPage}
      hasMore={!isReachingEnd}
      scrollThreshold={1}
      loader={<p>Loading...</p>}
      endMessage={
        <div className="text-center p-4 text-gray-500">
          <p>✨ You have seen all items ✨</p>

          <p className="text-sm">Total items: {items.length}</p>
        </div>
      }
    >
      {items.map((item, index) => (
        <div key={item.title}>
          <h3 className="text-lg font-medium">
            {index + 1} - {item.title}
          </h3>

          <p className="text-gray-600">{item.author}</p>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollList;

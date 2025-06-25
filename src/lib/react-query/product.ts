import { DEFAULT_PAGINATION_LIMIT } from "@/config/const";
import { productQueries } from "@/lib/queries/product";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export function useProduct() {
    const usePaginate = ({
        initialData,
        first = DEFAULT_PAGINATION_LIMIT,
    }: {
        initialData: Awaited<ReturnType<typeof productQueries.paginate>>;
        first?: number;
    }) => {
        return useInfiniteQuery({
            queryKey: ["product", "paginate", first],
            queryFn: async ({ pageParam }) => {
                const response = await axios.get("/api/v1/products", {
                    params: { after: pageParam, first },
                });
                return response.data.data;
            },
            initialPageParam: null,
            getNextPageParam: (lastPage) =>
                lastPage.pageInfo.hasNextPage
                    ? lastPage.pageInfo.endCursor
                    : undefined,
            initialData: {
                pages: [initialData],
                pageParams: [null],
            },
        });
    };

    return {
        usePaginate,
    };
}

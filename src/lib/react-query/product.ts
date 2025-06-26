import { DEFAULT_PAGINATION_LIMIT } from "@/config/const";
import { productQueries } from "@/lib/queries/product";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { ResponseData } from "../validations";

type ProductPaginationResponse = Awaited<
    ReturnType<typeof productQueries.paginate>
>;

export function useProduct() {
    const usePaginate = ({
        initialData,
        first = DEFAULT_PAGINATION_LIMIT,
    }: {
        initialData: ProductPaginationResponse;
        first?: number;
    }) => {
        return useInfiniteQuery({
            queryKey: ["product", "paginate", first],
            queryFn: async ({ pageParam }: { pageParam: string | null }) => {
                const response = await axios.get<
                    ResponseData<ProductPaginationResponse>
                >("/api/v1/products", {
                    params: { after: pageParam, first },
                });
                if (!response.data.success)
                    throw new Error(response.data.longMessage);
                return response.data.data;
            },
            initialPageParam: null,
            getNextPageParam: (lastPage) =>
                lastPage?.pageInfo.hasNextPage
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

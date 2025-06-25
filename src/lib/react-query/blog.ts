"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Blog, ResponseData } from "../validations";

export function useBlog() {
    const useScan = <T extends Blog[]>({
        limit,
        initialData,
    }: {
        limit?: number;
        initialData?: T;
    }) => {
        return useQuery({
            queryKey: ["blog", "scan", limit],
            queryFn: async () => {
                const response = await axios.get<ResponseData<T>>(
                    "/api/v1/blogs",
                    {
                        params: { limit },
                    }
                );
                if (!response.data.success)
                    throw new Error(response.data.longMessage);
                return response.data.data;
            },
            initialData,
        });
    };

    return {
        useScan,
    };
}

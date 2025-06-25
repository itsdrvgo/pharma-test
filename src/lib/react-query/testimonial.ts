"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ResponseData, Testimonial } from "../validations";

export function useTestimonial() {
    const useScan = <T extends Testimonial[]>({
        limit,
        initialData,
    }: {
        limit?: number;
        initialData?: T;
    }) => {
        return useQuery({
            queryKey: ["testimonial", "scan", limit],
            queryFn: async () => {
                const response = await axios.get<ResponseData<T>>(
                    "/api/v1/testimonials",
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

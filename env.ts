import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z
            .string({
                required_error: "DATABASE_URL is required",
            })
            .min(1, "DATABASE_URL must not be empty"),

        SHOPIFY_STORE_FRONT_ACCESS_TOKEN: z
            .string()
            .min(1, "SHOPIFY_STORE_FRONT_ACCESS_TOKEN is required"),
        SHOPIFY_DOMAIN: z.string().min(1, "SHOPIFY_DOMAIN is required"),
    },
    client: {
        NEXT_PUBLIC_DEPLOYMENT_URL: z
            .string()
            .url("NEXT_PUBLIC_DEPLOYMENT_URL must be a valid URL")
            .optional(),
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        SHOPIFY_DOMAIN: process.env.SHOPIFY_DOMAIN,
        SHOPIFY_STORE_FRONT_ACCESS_TOKEN:
            process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN,

        NEXT_PUBLIC_DEPLOYMENT_URL: process.env.NEXT_PUBLIC_DEPLOYMENT_URL,
    },
});

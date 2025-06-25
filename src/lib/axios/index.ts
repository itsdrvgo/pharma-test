import { env } from "@/../env";
import _axios from "axios";

export const axios = _axios.create({
    baseURL: `https://${env.SHOPIFY_DOMAIN}/api`,
    headers: {
        "X-Shopify-Storefront-Access-Token":
            env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

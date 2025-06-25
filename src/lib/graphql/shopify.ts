import { axios } from "../axios";
import { AppError } from "../utils";
import { Thunder } from "../zeus";

export const shopify = Thunder(async (query, variables) => {
    const res = await axios.post("/2023-07/graphql.json", { query, variables });

    if (res.status !== 200 || res.data.errors) {
        if (res.data.errors) console.error("GraphQL Errors:", res.data.errors);
        throw new AppError(
            res.statusText || "GraphQL request failed",
            "INTERNAL_SERVER_ERROR"
        );
    }

    return res.data.data;
});

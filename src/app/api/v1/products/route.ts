import { DEFAULT_PAGINATION_LIMIT } from "@/config/const";
import { queries } from "@/lib/queries";
import { CResponse, handleError } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        console.log("Search Params:", searchParams.toString());

        const first = parseInt(
            searchParams.get("first") || `${DEFAULT_PAGINATION_LIMIT}`,
            10
        );
        const after = searchParams.get("after") || null;

        const data = await queries.product.paginate(first, after);
        return CResponse({ data });
    } catch (err) {
        return handleError(err);
    }
}

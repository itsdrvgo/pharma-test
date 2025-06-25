import { queries } from "@/lib/queries";
import { AppError, CResponse, handleError, slugify } from "@/lib/utils";
import { createBlogSchema } from "@/lib/validations";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const limitRaw = searchParams.get("limit");
        if (!limitRaw) throw new AppError("Limit is required", "BAD_REQUEST");

        const limit = parseInt(limitRaw, 10);

        const data = await queries.blog.scan({ limit });
        return CResponse({ data });
    } catch (err) {
        return handleError(err);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = createBlogSchema.parse(body);

        const slug = slugify(parsed.title);

        const existingData = await queries.blog.get({ slug });
        if (existingData)
            throw new AppError(
                "Another blog with this title already exists",
                "CONFLICT"
            );

        const data = await queries.blog.create({ ...parsed, slug });
        return CResponse({ message: "CREATED", data });
    } catch (err) {
        return handleError(err);
    }
}

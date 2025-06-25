import { queries } from "@/lib/queries";
import { AppError, CResponse, handleError } from "@/lib/utils";
import { createTestimonialSchema } from "@/lib/validations";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const limitRaw = searchParams.get("limit");
        if (!limitRaw) throw new AppError("Limit is required", "BAD_REQUEST");

        const limit = parseInt(limitRaw, 10);

        const data = await queries.testimonial.scan({ limit });
        return CResponse({ data });
    } catch (err) {
        return handleError(err);
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = createTestimonialSchema.parse(body);

        const data = await queries.testimonial.create(parsed);
        return CResponse({ message: "CREATED", data });
    } catch (err) {
        return handleError(err);
    }
}

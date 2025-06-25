import { queries } from "@/lib/queries";
import { AppError, CResponse, handleError } from "@/lib/utils";

interface RouteProps {
    params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: RouteProps) {
    try {
        const { id } = await params;

        const data = await queries.testimonial.get(id);
        if (!data) throw new AppError("Testimonial not found", "NOT_FOUND");

        return CResponse({ data });
    } catch (err) {
        return handleError(err);
    }
}

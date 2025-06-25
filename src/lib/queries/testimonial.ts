import { db } from "../db";
import { testimonials } from "../db/schemas";
import { CreateTestimonial } from "../validations";

class TestimonialQuery {
    async scan({ limit }: { limit: number }) {
        const data = await db.select().from(testimonials).limit(limit);
        return data;
    }

    async get(id: string) {
        const data = await db.query.testimonials.findFirst({
            where: (f, o) => o.eq(f.id, id),
        });
        if (!data) return null;

        return data;
    }

    async create(values: CreateTestimonial) {
        const data = await db
            .insert(testimonials)
            .values(values)
            .returning()
            .then((res) => res[0]);

        return data;
    }
}

export const testimonialQueries = new TestimonialQuery();

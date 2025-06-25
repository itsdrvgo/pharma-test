import { db } from "../db";
import { blogs } from "../db/schemas";
import { Blog, CreateBlog } from "../validations";

class BlogQuery {
    async scan({ limit, type }: { limit: number; type?: Blog["type"] }) {
        const data = await db.query.blogs.findMany({
            where: (f, o) => (type ? o.eq(f.type, type) : undefined),
            limit,
            orderBy: (f, o) => [o.desc(f.createdAt)],
        });

        return data;
    }

    async get({ id, slug }: { id?: string; slug?: string }) {
        if (!id && !slug) throw new Error("Either id or slug must be provided");

        const data = await db.query.blogs.findFirst({
            where: (f, o) =>
                o.or(
                    id ? o.eq(f.id, id) : undefined,
                    slug ? o.eq(f.slug, slug) : undefined
                ),
        });
        if (!data) return null;

        return data;
    }

    async create(values: CreateBlog & { slug: string }) {
        const data = await db
            .insert(blogs)
            .values(values)
            .returning()
            .then((res) => res[0]);

        return data;
    }
}

export const blogQueries = new BlogQuery();

import { BLOG_TYPES } from "@/config/const";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../helper";

export const blogs = pgTable("blogs", {
    id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    content: text("content").notNull(),
    author: text("author").notNull(),
    tags: text("tags").array().notNull().default([]),
    thumbnailUrl: text("thumbnail_url").notNull(),
    category: text("category").notNull(),
    type: text("type", {
        enum: BLOG_TYPES,
    }).notNull(),
    ...timestamps,
});

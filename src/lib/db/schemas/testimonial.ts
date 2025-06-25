import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "../helper";

export const testimonials = pgTable("testimonials", {
    id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
    name: text("name").notNull(),
    content: text("content").notNull(),
    videoUrl: text("video_url").notNull(),
    ...timestamps,
});

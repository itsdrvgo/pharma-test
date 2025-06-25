import { BLOG_TYPES } from "@/config/const";
import { z } from "zod";
import { dateSchema, idSchema } from "./general";

export const blogSchema = z.object({
    id: idSchema,
    title: z
        .string({
            required_error: "Title is required",
            invalid_type_error: "Title must be a string",
        })
        .min(1, "Title cannot be empty"),
    slug: z
        .string({
            required_error: "Slug is required",
            invalid_type_error: "Slug must be a string",
        })
        .min(1, "Slug cannot be empty"),
    content: z
        .string({
            required_error: "Content is required",
            invalid_type_error: "Content must be a string",
        })
        .min(10, "Content must be at least 10 characters long"),
    author: z
        .string({
            required_error: "Author is required",
            invalid_type_error: "Author must be a string",
        })
        .min(2, "Author must be at least 2 characters long"),
    tags: z
        .array(
            z
                .string({
                    invalid_type_error: "Tag must be a string",
                })
                .min(1, "Tag must be at least 1 character long")
        )
        .default([]),
    thumbnailUrl: z
        .string({
            required_error: "Thumbnail URL is required",
            invalid_type_error: "Thumbnail URL must be a string",
        })
        .url("Thumbnail URL must be a valid URL"),
    category: z
        .string({
            required_error: "Category is required",
            invalid_type_error: "Category must be a string",
        })
        .min(1, "Category cannot be empty"),
    type: z.enum(BLOG_TYPES, {
        required_error: "Type is required",
        invalid_type_error:
            "Type must be either 'patient_story' or 'doctor_insight'",
    }),
    createdAt: dateSchema,
    updatedAt: dateSchema,
});

export const createBlogSchema = blogSchema.omit({
    id: true,
    slug: true,
    createdAt: true,
    updatedAt: true,
});

export type Blog = z.infer<typeof blogSchema>;
export type CreateBlog = z.infer<typeof createBlogSchema>;

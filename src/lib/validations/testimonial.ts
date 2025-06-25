import { z } from "zod";
import { dateSchema } from "./general";

export const testimonialSchema = z.object({
    id: z
        .string({
            invalid_type_error: "ID must be a string",
            required_error: "ID is required",
        })
        .uuid("Please provide a valid ID"),
    name: z
        .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        })
        .min(1, "Name cannot be empty"),
    content: z
        .string({
            required_error: "Content is required",
            invalid_type_error: "Content must be a string",
        })
        .min(10, "Content must be at least 10 characters long"),
    videoUrl: z
        .string({
            required_error: "Video URL is required",
            invalid_type_error: "Video URL must be a string",
        })
        .url("Video URL must be a valid URL"),
    createdAt: dateSchema,
    updatedAt: dateSchema,
});

export const createTestimonialSchema = testimonialSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export type Testimonial = z.infer<typeof testimonialSchema>;
export type CreateTestimonial = z.infer<typeof createTestimonialSchema>;

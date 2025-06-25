import { z } from "zod";

export const idSchema = z
    .string({
        invalid_type_error: "ID must be a string",
        required_error: "ID is required",
    })
    .uuid("Please provide a valid ID");

export const dateSchema = z
    .union([z.string(), z.date()], {
        required_error: "Date is required",
        invalid_type_error: "Date must be a date",
    })
    .transform((v) => new Date(v));

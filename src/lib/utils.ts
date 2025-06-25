import { ERROR_MESSAGES } from "@/config/const";
import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { NextResponse } from "next/server";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";
import { ResponseMessages } from "./validations";

export function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getAbsoluteURL(path: string = "/") {
    if (process.env.NEXT_PUBLIC_DEPLOYMENT_URL)
        return `https://${process.env.NEXT_PUBLIC_DEPLOYMENT_URL}${path}`;
    else if (process.env.VERCEL_URL)
        return `https://${process.env.VERCEL_URL}${path}`;
    return "http://localhost:3000" + path;
}

export class AppError extends Error {
    status: ResponseMessages;

    constructor(message: string, status: ResponseMessages = "BAD_REQUEST") {
        super(message);
        this.name = "AppError";
        this.status = status;
    }
}

export function sanitizeError(error: unknown): string {
    if (error instanceof AppError) return error.message;
    else if (error instanceof AxiosError)
        return (
            error.response?.data?.longMessage ??
            error.response?.data?.message ??
            error.message
        );
    else if (error instanceof ZodError)
        return error.issues.map((x) => x.message).join(", ");
    else if (error instanceof Error) return error.message;
    else return ERROR_MESSAGES.GENERIC;
}

export function handleError(error: unknown) {
    if (error instanceof AppError)
        return CResponse({
            message: error.status,
            longMessage: sanitizeError(error),
        });
    else if (error instanceof AxiosError)
        return CResponse({
            message: "INTERNAL_SERVER_ERROR",
            longMessage: sanitizeError(error),
        });
    else if (error instanceof ZodError)
        return CResponse({
            message: "BAD_REQUEST",
            longMessage: sanitizeError(error),
        });
    else if (error instanceof Error)
        return CResponse({
            message: "INTERNAL_SERVER_ERROR",
            longMessage: error.message,
        });
    else return CResponse({ message: "INTERNAL_SERVER_ERROR" });
}

export function CResponse<T>({
    message = "OK",
    longMessage,
    data,
}: {
    message?: ResponseMessages;
    longMessage?: string;
    data?: T;
} = {}) {
    let code: number;
    let success = false;

    switch (message) {
        case "OK":
            success = true;
            code = 200;
            break;
        case "CREATED":
            success = true;
            code = 201;
            break;
        case "BAD_REQUEST":
            code = 400;
            break;
        case "ERROR":
            code = 400;
            break;
        case "UNAUTHORIZED":
            code = 401;
            break;
        case "FORBIDDEN":
            code = 403;
            break;
        case "NOT_FOUND":
            code = 404;
            break;
        case "CONFLICT":
            code = 409;
            break;
        case "TOO_MANY_REQUESTS":
            code = 429;
            break;
        case "UNPROCESSABLE_ENTITY":
            code = 422;
            break;
        case "INTERNAL_SERVER_ERROR":
            code = 500;
            break;
        case "UNKNOWN_ERROR":
            code = 500;
            break;
        case "NOT_IMPLEMENTED":
            code = 501;
            break;
        case "BAD_GATEWAY":
            code = 502;
            break;
        case "SERVICE_UNAVAILABLE":
            code = 503;
            break;
        case "GATEWAY_TIMEOUT":
            code = 504;
            break;
        default:
            code = 500;
            break;
    }

    return NextResponse.json(
        { success, longMessage, data },
        { status: code, statusText: message }
    );
}

export function handleClientError(error: unknown, toastId?: string | number) {
    return toast.error(sanitizeError(error), { id: toastId });
}

export function parseToJSON<T>(data?: string | null): T | null {
    if (!data) return null;
    return JSON.parse(data);
}

export function slugify(text: string, separator: string = "-") {
    return text
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, separator);
}

export function convertValueToLabel(value: string) {
    return value
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .split(/[_-\s]/)
        .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
        .join(" ");
}

export function convertEmptyStringToNull(data: unknown) {
    return typeof data === "string" && data === "" ? null : data;
}

import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config();

export default defineConfig({
    schema: "./src/lib/db/schemas",
    dialect: "postgresql",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});

import {defineConfig} from "drizzle-kit";
import env from "./packages/db/env";

// define config for drizzle kit
export default defineConfig({
    out: "./drizzle",
    schema: "./packages/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DATABASE_URL
    }
})
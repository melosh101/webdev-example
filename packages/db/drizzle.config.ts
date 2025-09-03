import {defineConfig} from "drizzle-kit";
import env from "../server/env";

// define config for drizzle kit
export default defineConfig({
    out: "./drizzle",
    schema: "./server/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DATABASE_URL
    }
})
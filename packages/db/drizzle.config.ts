import {defineConfig} from "drizzle-kit";
import env from "./env";


// define config for drizzle kit
export default defineConfig({
    out: "./drizzle",
    schema: "./schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DATABASE_URL,
    }
})
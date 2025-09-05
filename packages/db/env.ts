import z from "zod";

// define environment variables schema to make sure all required variables are present
const envSchema = z.object({
	DATABASE_URL: zP.url(),
	PORT: z.string().min(2).max(4).regex(/^\d+$/, "must be a number").default("3000"),
	NODE_ENV: z.enum(["development", "production"]).default("development"),
});

// Parse the env variables, this will throw an error causing the process to exit if any required variables are missing or invalid
const env = envSchema.parse(process.env);

export default env;

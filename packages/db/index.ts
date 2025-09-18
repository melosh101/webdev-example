import { drizzle } from "drizzle-orm/node-postgres";
import env from "./env";
import * as schema from "./schema";

const db = drizzle({
	connection: env.DATABASE_URL,
	schema: schema,
	logger: env.NODE_ENV === "development",
});

export { db };

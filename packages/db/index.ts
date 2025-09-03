import { drizzle } from "drizzle-orm/node-postgres";
import env from "../server/env";
import * as schema from "./schema"

const db = drizzle({
    connection: env.DATABASE_URL,
    schema: schema,
});

export {db};

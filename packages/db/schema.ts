import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const hilsnerTable = pgTable("hilsner", {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: text("name").notNull(),
    
})
import { sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const hilsnerTable = pgTable("hilsner", {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: text("name").notNull(),
    message: text("message").notNull(),
    status: text("status").notNull().default("pending").$type<"pending" | "approved" | "rejected">(),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().$onUpdateFn(() =>sql `now()`)
})
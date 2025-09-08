"use server";
import "server-only";

import { db } from "@webdev/db";
import { hilsnerTable } from "@webdev/db/schema";
import { eq } from "drizzle-orm";

export async function updateState(
	state: "pending" | "approved" | "rejected",
	id: number,
) {

    console.log("Updating state", state, id);
	return await db
		.update(hilsnerTable)
		.set({ status: state })
		.where(eq(hilsnerTable.id, id));
}

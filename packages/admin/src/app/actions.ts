"use server";
import "server-only";

import { db } from "@webdev/db";
import { hilsnerTable } from "@webdev/db/schema";
import { eq } from "drizzle-orm";
import pusher from "../server/pusher";

export async function updateState(
  state: "pending" | "approved" | "rejected",
  id: number,
) {
  console.log("Updating state", state, id);
  const res = await db
    .update(hilsnerTable)
    .set({ status: state })
    .where(eq(hilsnerTable.id, id))
    .returning();

  const didPush = await pusher.trigger("hilsner", "message", res[0]);
  console.log("Pusher result", didPush.ok);
  return res[0];
}

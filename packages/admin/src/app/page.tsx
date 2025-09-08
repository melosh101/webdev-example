import { forceLogin } from "@/lib/utils";
import { auth } from "@/server/auth";
import { db } from "@webdev/db";
import { hilsnerTable } from "@webdev/db/schema";
import ClientHilsnerList from "./ClientHilsnerList";
import { desc } from "drizzle-orm";

export default async function Home() {
  const session = await auth();
  if(!session) {
    return forceLogin("/")
  }
  const hilsner = await db.select({
    id: hilsnerTable.id,
    name: hilsnerTable.name,
    message: hilsnerTable.message,
    status: hilsnerTable.status,
  }).from(hilsnerTable)
  .orderBy(desc(hilsnerTable.createdAt));
  return (
    <div className="flex min-h-screen flex-col just items-center p-24">
      Logged in as {session.user?.name}
      <ClientHilsnerList initialHilsner={hilsner} />
    </div>
  );
}




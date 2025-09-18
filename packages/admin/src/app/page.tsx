import { db } from "@webdev/db";
import { hilsnerTable } from "@webdev/db/schema";
import { desc } from "drizzle-orm";
import { forceLogin } from "@/lib/utils";
import { auth } from "@/server/auth";
import ClientHilsnerList from "./ClientHilsnerList";

export default async function Home() {
  const session = await auth();
  if (!session) {
    forceLogin("/");
    return <div>Redirecting to login...</div>;
  }

  const hilsner = await db
    .select({
      id: hilsnerTable.id,
      name: hilsnerTable.name,
      message: hilsnerTable.message,
      status: hilsnerTable.status,
    })
    .from(hilsnerTable)
    .orderBy(desc(hilsnerTable.createdAt));

  ("SELECT * FROM hilsnerTable ORDER BY createdAt DESC");

  return (
    <div className="flex min-h-screen flex-col just items-center p-24">
      Logged in as {session.user?.name}
      <ClientHilsnerList initialHilsner={hilsner} />
    </div>
  );
}

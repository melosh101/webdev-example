import { db } from "@webdev/db";
import env from "@webdev/db/env";
import Fastify from "fastify";	
import { hilsnerTable } from "@webdev/db/schema";
import z from "zod";
import cors from "@fastify/cors"

const fastify = Fastify({
	logger: true,
});

if(env.NODE_ENV !== "production") {
	await fastify.register(cors, {
		origin: ["http://localhost:5500"],
		methods: ["GET", "POST"],
	});
}


const insertHilsen = z.object({
	name: z.string().min(2).max(100),
	message: z.string().min(30).max(500),
});

fastify.get("/hilsen", async (_request, reply) => {
	const hilsner = await db.select().from(hilsnerTable);
	reply.send(hilsner);
});

fastify.post("/hilsen", async (request, reply) => {
	const parseResult = insertHilsen.safeParse(request.body);
	if (!parseResult.success) {
		reply.status(400).send({
			status: 400,
			message: "Bad request",
			...z.treeifyError(parseResult.error),
		});
		return;
	}
	await db.insert(hilsnerTable).values({
		...parseResult.data,
	});
	reply.status(201).send(parseResult.data);
});

fastify.listen(
	{
		port: Number(env.PORT || 3000),
	},
	(err) => {
		if (err) {
			fastify.log.error(err);
			return process.exit(1);
		}
	},
);

import { db } from "@webdev/db";
import Fastify from "fastify";
import env from "@webdev/db/env";
import { hilsnerTable } from "@webdev/db/schema";
import z from "zod";

const fastify = Fastify({
	logger: true,
});


fastify.get("/hilsner", async (request, reply) => {
	const hilsner = await db.select().from(hilsnerTable);
	reply.send(hilsner)
});

const insertHilsen = z.object({
	name: z.string().min(2).max(100),
	message: z.string().min(2).max(500),

})

fastify.post("/hilsner", async (request, reply) => {
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
		...parseResult.data
	})
	reply.status(201).send(parseResult.data);
});


fastify.listen({
	port: Number(env.PORT || 3000),
}, (err) => {
	if (err) {
		fastify.log.error(err);
		return process.exit(1);
	}
})

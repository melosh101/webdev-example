import { db } from "@webdev/db";
import env from "@webdev/db/env";
import Fastify, { type FastifyPluginAsync } from "fastify";
import { hilsnerTable } from "@webdev/db/schema";
import z from "zod";
import cors from "@fastify/cors";

const insertHilsen = z.object({
	name: z.string().min(2).max(100),
	message: z.string().min(30).max(500),
});

const app: FastifyPluginAsync<{}> = async (fastify, opts): Promise<void> => {
	// place here any custom plugins or routes
	await fastify.register(cors, {
		origin: ["*"],
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
	fastify.route({
		method: ["get", "post", "put", "delete", "patch"],
		url: "/*",
		handler: async (request, reply) => {
			fastify.log.info(
				`${request.ip} tried to access ${request.method} ${request.url}`,
			);
			reply.status(404).send({
				status: 404,
				message: `No route on ${request.method} ${request.url}`,
			});
		},
	});
};

export default app;
import { db } from "@webdev/db";
import Fastify from "fastify";

const fastify = Fastify({
	logger: true,
});


fastify.get("/", async (request, reply) => {});

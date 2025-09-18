/** biome-ignore-all lint/style/noNonNullAssertion: <explanation> */
import "server-only";

import Pusher from "pusher";


const options = {
    appId: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    key: process.env.PUSHER_KEY!,
	host: process.env.PUSHER_HOST!,
	port: process.env.PUSHER_PORT || "80",
    useTLS: false,
    cluster: process.env.PUSHER_CLUSTER || "mt1",
}

console.log("Pusher options", options);
const client = new Pusher(options);

export default client;

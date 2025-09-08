import { signIn } from "@/server/auth";

// Route handler that triggers direct sign-in with the custom OAuth provider
export async function GET(request: Request) {
	const url = new URL(request.url);
	const callbackUrl = url.searchParams.get("callbackUrl") || "/";
	// This returns a redirect Response to the provider (and later back to callbackUrl)
	return (await signIn("keycloak", {
		redirectTo: callbackUrl,
	})) as Response;
}
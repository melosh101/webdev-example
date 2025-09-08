/** biome-ignore-all lint/style/noNonNullAssertion: we depend on magic here */
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import { db } from "@webdev/db";
import { accounts, authenticators, sessions, users, verificationTokens } from "@webdev/db/schema";
import KeycloakProvider from "next-auth/providers/keycloak";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
			// ...other properties
			// role: UserRole;
		} & DefaultSession["user"];
	}
}

export const authConfig = {
    adapter: DrizzleAdapter(db, {
        sessionsTable: sessions,
        accountsTable: accounts,
        usersTable: users,
        authenticatorsTable: authenticators,
        verificationTokensTable: verificationTokens,
    }),
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_ID!,
            clientSecret: process.env.KEYCLOAK_SECRET!,
            issuer: process.env.KEYCLOAK_ISSUER!,
        })
    ]
} satisfies NextAuthConfig;
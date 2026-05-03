// auth-client.js
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "https://summer-store-tau.vercel.app",
});

export const { signIn, signUp, useSession } = authClient;

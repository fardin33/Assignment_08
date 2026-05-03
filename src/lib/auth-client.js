// auth-client.js
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://summer-store-tau.vercel.app",
});

export const { signIn, signUp, useSession } = authClient;

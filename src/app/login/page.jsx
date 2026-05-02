"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/profile";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await authClient.signIn.email({
      email,
      password,
    });

    if (res.error) {
      toast.error(res.error.message || "Login failed");
      return;
    }

    toast.success("Login successful");
    window.location.href = redirect;
  }

  async function handleGoogleLogin() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirect,
    });
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center  px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-4xl bg-white p-8 shadow-xl"
      >
        <h1 className="text-4xl font-black">Welcome back</h1>
        <p className="mt-2 text-gray-500">Login to continue shopping.</p>

        <input
          type="email"
          placeholder="Email"
          className="mt-8 w-full rounded-2xl border px-4 py-4 outline-orange-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mt-4 w-full rounded-2xl border px-4 py-4 outline-orange-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="mt-6 w-full rounded-full bg-orange-500 py-4 font-black text-white">
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-4 w-full rounded-full border py-4 font-black"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          No account?{" "}
          <Link href="/register" className="font-black text-orange-500">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-12 pt-28 text-white sm:pt-32 lg:pt-25">
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-yellow-400/20 blur-3xl" />

      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md rounded-4xl border border-white/10 bg-white/10 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
      >
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight">Login</h1>
          <p className="mt-3 text-sm text-white/60">
            Welcome back! Login to continue shopping.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-white/80">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-orange-400 focus:bg-white/15"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-white/80">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-orange-400 focus:bg-white/15"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-yellow-500 py-4 font-black text-teal-700 shadow-lg shadow-orange-500/20 transition hover:scale-[1.02]"
        >
          Login
        </button>

        <div className="my-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-sm font-bold text-white/45">Or</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full rounded-full border border-white/10 bg-white/10 py-4 font-black text-white transition hover:border-orange-400/60 hover:bg-white/15"
        >
          Login with Google
        </button>

        <p className="mt-6 text-center text-sm text-white/55">
          Don&apos;t have an account?{" "}
          <Link
            href={`/register?redirect=${redirect}`}
            className="font-black text-yellow-500 transition hover:text-yellow-300"
          >
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}

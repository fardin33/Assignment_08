"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/profile";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const res = await authClient.signUp.email({
      name,
      email,
      password,
      image,
    });

    if (res.error) {
      toast.error(res.error.message || "Register failed");
      return;
    }

    toast.success("Registration successful");
    window.location.href = redirect;
  }

  async function handleGoogleRegister() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirect,
    });
  }

  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-4 pb-16 pt-23  md:pt-24 lg:pt-25 text-white">
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-yellow-400/20 blur-3xl" />

      <form
        onSubmit={handleRegister}
        className="relative z-10 w-full max-w-md rounded-4xl border border-white/10 bg-white/10 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
      >
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight">Register</h1>
          <p className="mt-3 text-sm text-white/60">
            Create your account and start shopping.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-white/80">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-orange-400 focus:bg-white/15"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              Image Path
            </label>
            <input
              type="text"
              placeholder="https://example.com/profile.png"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-orange-400 focus:bg-white/15"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-white/80">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-orange-400 focus:bg-white/15"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full rounded-full bg-yellow-500 py-4 font-black text-teal-700 shadow-lg shadow-orange-500/20 transition hover:scale-[1.02]"
        >
          Register
        </button>

        <div className="my-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-sm font-bold text-white/45">Or</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full rounded-full border border-white/10 bg-white/10 py-4 font-black text-white transition hover:border-orange-400/60 hover:bg-white/15"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-white/55">
          Already have an account?{" "}
          <Link
            href={`/login?redirect=${redirect}`}
            className="font-black text-yellow-500 transition hover:text-yellow-300"
          >
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}

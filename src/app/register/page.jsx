"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const res = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (res.error) {
      toast.error(res.error.message || "Registration failed");
      return;
    }

    toast.success("Account created");
    window.location.href = "/profile";
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-sky-50 px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-4xl bg-white p-8 shadow-xl"
      >
        <h1 className="text-4xl font-black">Create account</h1>
        <p className="mt-2 text-gray-500">Join SunCart today.</p>

        <input
          type="text"
          placeholder="Full name"
          className="mt-8 w-full rounded-2xl border px-4 py-4 outline-sky-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="mt-4 w-full rounded-2xl border px-4 py-4 outline-sky-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mt-4 w-full rounded-2xl border px-4 py-4 outline-sky-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="mt-6 w-full rounded-full bg-sky-500 py-4 font-black text-white">
          Register
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have account?{" "}
          <Link href="/login" className="font-black text-sky-500">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}

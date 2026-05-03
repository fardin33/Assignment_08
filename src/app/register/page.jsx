"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";
import { Eye, EyeOff } from "lucide-react";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/Insider-loading.json";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    const form = e.currentTarget;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const image = form.image.value.trim();

    if (!name) {
      toast.error("Full name is required");
      form.name.focus();
      return;
    }

    if (!email) {
      toast.error("Email is required");
      form.email.focus();
      return;
    }

    if (!password) {
      toast.error("Password is required");
      form.password.focus();
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      form.password.focus();
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name,
        email,
        password,
      };

      if (image) {
        payload.image = image;
      }

      const { data, error } = await authClient.signUp.email(payload);

      if (error) {
        console.log("Register error:", error);
        toast.error(error.message || "Registration failed");
        return;
      }

      console.log("Register data:", data);

      toast.success("Registration successful");
      form.reset();
      setIsPasswordVisible(false);

      router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
      router.refresh();
    } catch (error) {
      console.log("Register catch error:", error);

      toast.error(
        error?.message ||
          "Registration failed. Please check your auth API setup.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: redirect,
      });

      if (error) {
        console.log("Google registration error:", error);
        toast.error(error.message || "Google registration failed");
        setLoading(false);
      }
    } catch (error) {
      console.log("Google registration catch error:", error);
      toast.error(error?.message || "Google registration failed");
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-4 pb-16 pt-23 text-white md:pt-24 lg:pt-25">
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-yellow-400/20 blur-3xl" />

      <form
        onSubmit={handleRegister}
        noValidate
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
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-bold text-white/80"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-orange-400 focus:bg-white/15"
              autoComplete="name"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-white/80"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-orange-400 focus:bg-white/15"
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-bold text-white/80"
            >
              Image URL Optional
            </label>

            <input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/profile.png"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-orange-400 focus:bg-white/15"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-white/80"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Create a password"
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 pr-13 text-white outline-none transition placeholder:text-white/35 focus:border-orange-400 focus:bg-white/15"
                minLength={8}
                autoComplete="new-password"
                disabled={loading}
              />

              <button
                type="button"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                disabled={loading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
              >
                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex h-13 w-full items-center justify-center overflow-hidden rounded-full bg-yellow-500 font-black text-teal-700 shadow-lg shadow-orange-500/20 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <span className="flex h-12 w-24 items-center justify-center overflow-hidden">
              <Lottie
                animationData={loadingAnimation}
                loop
                className="h-75 w-70"
              />
            </span>
          ) : (
            "Register"
          )}
        </button>

        <div className="my-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-sm font-bold text-white/45">Or</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 py-3 font-semibold text-white transition hover:border-orange-400/60 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <GrGoogle className="text-xl" />
          <span>Continue with Google</span>
        </button>

        <p className="mt-6 text-center text-sm text-white/55">
          Already have an account?{" "}
          <Link
            href={`/login?redirect=${encodeURIComponent(redirect)}`}
            className="font-black text-yellow-500 transition hover:text-yellow-300"
          >
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center px-4 text-white">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-[0_0_60px_rgba(255,255,255,0.08)] backdrop-blur-xl">
            <div className="relative h-14 w-14">
              <div className="absolute inset-0 rounded-full border-4 border-white/10" />
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-r-white/70 border-t-white" />
            </div>
          </div>
        </main>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}

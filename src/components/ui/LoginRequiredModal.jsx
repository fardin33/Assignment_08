"use client";

import { X, LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginRequiredModal({ open, onClose }) {
  const router = useRouter();

  if (!open) return null;

  const handleLogin = () => {
    onClose();
    router.push("/login?redirect=/UpdateProfile");
  };

  const handleRegister = () => {
    onClose();
    router.push("/register?redirect=/UpdateProfile");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-4xl border border-white/10 bg-[#062f2d] p-7 text-white shadow-[0_25px_90px_rgba(0,0,0,0.45)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/10 p-2 text-white/70 transition hover:bg-white/20 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400/15 text-yellow-300">
          <LogIn size={32} />
        </div>

        <div className="mt-5 text-center">
          <h2 className="text-2xl font-black">You are not Login</h2>

          <p className="mt-3 text-sm font-medium leading-6 text-white/60">
            You Should Register or Login First to update your profile.
          </p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleLogin}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-5 py-3 text-sm font-black text-teal-900 transition hover:scale-[1.02] hover:bg-yellow-300"
          >
            <LogIn size={17} />
            Login
          </button>

          <button
            type="button"
            onClick={handleRegister}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:border-yellow-300/50 hover:bg-white/15"
          >
            <UserPlus size={17} />
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

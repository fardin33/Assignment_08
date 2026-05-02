"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Pencil, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import LoginRequiredModal from "@/components/ui/LoginRequiredModal";

const STORAGE_KEY = "summer-store-profile";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [savedProfile] = useState(() => {
    try {
      if (typeof window === "undefined") return null;

      const profile = localStorage.getItem(STORAGE_KEY);
      return profile ? JSON.parse(profile) : null;
    } catch {
      return null;
    }
  });

  const profile = useMemo(() => {
    return {
      name: savedProfile?.name || user?.name || "Customer",
      email: savedProfile?.email || user?.email || "No email found",
      image: savedProfile?.image || user?.image || "",
    };
  }, [savedProfile, user?.name, user?.email, user?.image]);

  const handleUpdateProfile = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    router.push("/UpdateProfile");
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#042f2e] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-11 w-11 animate-spin rounded-full border-4 border-white/20 border-t-yellow-300" />

          <p className="text-sm font-bold tracking-widest text-white/50">
            Loading Profile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#042f2e] pt-32 pb-20 text-white">
        <section className="mx-auto w-11/12 max-w-7xl">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-4xl border border-white/10 bg-white/10 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-8">
            {/* Header */}
            <div className="rounded-3xl border border-white/10 bg-black/10 p-6 text-center">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-300">
                My Profile
              </p>

              <h1 className="mt-3 text-2xl font-black md:text-3xl lg:text-4xl">
                Welcome,{" "}
                <span className="bg-linear-to-r from-teal-300 to-yellow-300 bg-clip-text text-transparent">
                  {profile.name}
                </span>
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-6 text-white/60">
                Manage your personal information and keep your profile details
                updated.
              </p>
            </div>

            {/* Profile Info */}
            <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
              {/* Image */}
              <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-black/10 p-6">
                <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-yellow-400/80 bg-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                  {profile.image ? (
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      width={160}
                      height={160}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-teal-900">
                      <User size={70} className="text-yellow-300" />
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="rounded-3xl border border-white/10 bg-black/10 p-6">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 md:text-[11px] lg:text-[12px]">
                      Full Name
                    </p>

                    <h2 className="mt-1 text-[15px] font-black text-white md:text-[17px] lg:text-[19px]">
                      {profile.name}
                    </h2>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 md:text-[11px] lg:text-[12px]">
                      Email Address
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-white/75">
                      <Mail size={18} className="text-yellow-300" />

                      <p className="text-[12px] font-semibold md:text-[14px] lg:text-[15px]">
                        {profile.email}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleUpdateProfile}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-sm font-black text-white shadow-sm shadow-gray-500/90 transition duration-300 hover:-translate-y-1 hover:bg-black hover:text-white md:w-auto"
                >
                  <Pencil size={17} />
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LoginRequiredModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}

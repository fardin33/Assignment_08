"use client";

import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <main className="mx-auto min-h-[70vh] w-11/12 max-w-7xl py-20">
        <div className="h-40 animate-pulse rounded-4xl bg-gray-200" />
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[70vh] w-11/12 max-w-7xl py-20">
      <div className="rounded-4xl bg-white p-8 shadow-xl">
        <p className="font-black text-orange-500">My Profile</p>
        <h1 className="mt-2 text-4xl font-black">
          Hello, {session?.user?.name || "Customer"}
        </h1>
        <p className="mt-3 text-gray-500">{session?.user?.email}</p>
      </div>
    </main>
  );
}

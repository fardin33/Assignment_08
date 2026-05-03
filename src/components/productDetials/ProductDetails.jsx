"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Star, ArrowLeft, ShoppingCart, X, LockKeyhole } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProductDetails({ product }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: session } = authClient.useSession();

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const currentPageUrl = useMemo(() => {
    const queryString = searchParams.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  }, [pathname, searchParams]);

  const loginUrl = `/login?redirect=${encodeURIComponent(currentPageUrl)}`;
  const registerUrl = `/register?redirect=${encodeURIComponent(currentPageUrl)}`;

  const handleAddToCart = () => {
    if (!session) {
      setShowLoginModal(true);
      return;
    }

    toast.success(`${product.name} added to cart`);
  };

  return (
    <section className="mx-auto w-11/12 max-w-7xl pt-30 pb-50">
      <button
        onClick={handleBack}
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-white/60 transition hover:text-amber-400"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="rounded-4xl border border-white/10 bg-white/3 p-4 shadow-[0_25px_80px_rgba(0,0,0,0.22)] backdrop-blur-sm md:p-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative h-105 overflow-hidden rounded-4xl border border-white/10 bg-white/10 p-3">
            <div className="relative h-full overflow-hidden rounded-3xl bg-black/20">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-400">
                {product.category}
              </p>
            </div>

            <h1 className="mt-6 text-4xl font-black text-white lg:text-6xl">
              {product.name}
            </h1>

            <p className="mt-3 text-lg font-semibold text-white/60">
              Brand: {product.brand}
            </p>

            <div className="mt-5 flex gap-3">
              <p className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white/60">
                Stock: {product.stock}
              </p>

              <div className="flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1 text-amber-400">
                <Star size={15} fill="currentColor" />
                <span className="font-black">{product.rating}</span>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/70">
              {product.description}
            </p>

            <div className="mt-8 flex flex-col gap-5 border-y border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-4xl font-black text-amber-400">
                ${product.price}
              </p>

              <button
                onClick={handleAddToCart}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-800 px-6 py-4 font-semibold text-white transition hover:bg-black hover:text-white active:scale-95 sm:w-fit"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-4xl border border-white/10 bg-[#062a28] p-6 text-white shadow-[0_25px_100px_rgba(0,0,0,0.45)]">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/10 p-2 text-white/70 transition hover:bg-white hover:text-black"
            >
              <X size={18} />
            </button>

            <div className="mb-5 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 p-4 text-amber-400">
              <LockKeyhole size={30} />
            </div>

            <h2 className="text-2xl font-black">Login Required</h2>

            <p className="mt-3 text-sm leading-6 text-white/65">
              Please log in or register to add this item to your cart. You’ll be
              returned to this product page afterward.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link
                href={loginUrl}
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-5 py-3 text-sm font-black text-black transition hover:bg-white active:scale-95"
              >
                Login
              </Link>

              <Link
                href={registerUrl}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white hover:text-black active:scale-95"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

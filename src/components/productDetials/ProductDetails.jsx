"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowLeft, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductDetails({ product }) {
  return (
    <section className="mx-auto w-11/12 max-w-7xl pt-30 pb-50 ">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-white/60 transition hover:text-amber-400"
      >
        <ArrowLeft size={18} />
        Back to home
      </Link>

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
                onClick={() => toast.success(`${product.name} added to cart`)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-800 px-6 py-4 font-semibold text-white transition hover:bg-black hover:text-white  active:scale-95 sm:w-fit"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

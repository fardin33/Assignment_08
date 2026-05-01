"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowLeft, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductDetails({ product }) {
  return (
    <section className="mx-auto w-11/12 max-w-7xl py-16">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-white/60 transition hover:text-amber-400"
      >
        <ArrowLeft size={18} />
        Back to home
      </Link>

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
          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-400">
            {product.category}
          </p>

          <h1 className="mt-4 text-4xl font-black text-white lg:text-6xl">
            {product.name}
          </h1>

          <p className="mt-3 text-lg font-semibold text-white/60">
            Brand: {product.brand}
          </p>

          <div className="mt-5 flex items-center gap-2 text-amber-400">
            <Star size={18} fill="currentColor" />
            <span className="font-black">{product.rating}</span>
          </div>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/70">
            {product.description}
          </p>

          <div className="mt-8 flex items-center justify-between border-y border-white/10 py-5">
            <p className="text-4xl font-black text-amber-400">
              ${product.price}
            </p>

            <p className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/60">
              Stock: {product.stock}
            </p>
          </div>

          <button
            onClick={() => toast.success(`${product.name} added to cart`)}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-4 font-black text-black transition hover:bg-amber-300 active:scale-95 sm:w-fit"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

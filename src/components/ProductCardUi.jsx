"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { motion } from "framer-motion";
export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group overflow-hidden rounded-4xl border border-white/10 bg-white/10 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-md"
    >
      <div className="relative h-80 overflow-hidden rounded-3xl bg-black/10 md:h-85">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10" />

        <span className="absolute left-4 top-4 rounded-full bg-black/60 px-4 py-2 text-[11px] font-black uppercase tracking-wide text-white backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="px-3 pb-2 pt-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-xl font-black leading-none text-white">
              {product.name}
            </h3>

            <p className="mt-1 text-sm font-semibold leading-none text-white/60">
              {product.brand}
            </p>
          </div>

          <p className="shrink-0 text-xl font-black leading-none text-amber-400 mr-1">
            ${product.price}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white/55">
            <span className="flex items-center gap-1 text-amber-400">
              <Star size={13} fill="currentColor" />
              {product.rating}
            </span>

            <span className="h-1 w-1 rounded-full bg-white/30" />

            <span>Stock: {product.stock}</span>
          </div>

          <Link
            href={`/products/${product.id}`}
            className="group/details inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs font-black text-white/75 shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black"
          >
            Details
            <span className="grid h-6 w-6 place-items-center rounded-full border border-white/20 bg-transparent text-white transition duration-300 group-hover/details:translate-x-1 group-hover/details:border-black group-hover/details:bg-black group-hover/details:text-yellow-400">
              <ArrowUpRight size={14} strokeWidth={3} />
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

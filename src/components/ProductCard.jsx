"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-4xl border border-orange-100 bg-white shadow-sm transition hover:shadow-2xl"
    >
      <Link href={`/products/${product.id}`} className="block overflow-hidden">
        <div className="relative h-72 overflow-hidden bg-orange-50">
          <Image
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
          <span className="absolute left-4 top-4 rounded-full bg-yellow-300 px-4 py-1 text-xs font-black">
            {product.badge}
          </span>
        </div>
      </Link>

      <div className="p-5">
        <p className="text-sm font-bold text-sky-500">{product.category}</p>

        <h3 className="mt-2 text-xl font-black text-gray-900">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center gap-1 text-sm font-bold text-orange-400">
          <Star size={16} fill="currentColor" />
          {product.rating}
          <span className="ml-1 text-gray-400">(120+ reviews)</span>
        </div>

        <div className="mt-4 flex items-end gap-3">
          <p className="text-2xl font-black text-orange-500">
            ৳{product.price}
          </p>
          <p className="font-bold text-gray-400 line-through">
            ৳{product.oldPrice}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href={`/products/${product.id}`}
            className="rounded-full border border-gray-200 px-4 py-3 text-center text-sm font-black transition hover:bg-gray-100"
          >
            View Details
          </Link>
          <button
            onClick={() => toast.success(`${product.name} added to cart`)}
            className="rounded-full bg-orange-500 px-4 py-3 text-sm font-black text-white transition active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

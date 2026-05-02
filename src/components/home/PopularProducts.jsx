"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCardUi";

const PopularProducts = ({ products = [] }) => {
  return (
    <section className="mx-auto mt-30 w-11/12 max-w-8xl xl:w-11/13">
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-yellow-400">
            Featured
          </p>

          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            Popular <span className="text-yellow-400">Products</span>
          </h2>
        </div>

        <Link
          href="/products"
          className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white/70 backdrop-blur transition duration-300 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black sm:mr-2"
        >
          View all
          <span className="grid h-6 w-6 place-items-center rounded-full border border-white/30 bg-transparent text-white transition duration-300 group-hover:translate-x-1 group-hover:border-black group-hover:bg-black group-hover:text-yellow-400">
            <ArrowUpRight size={14} strokeWidth={3} />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
        {products.slice(0, 3).map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;

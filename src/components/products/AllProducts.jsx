"use client";

import ProductCard from "@/components/ui/ProductCardUi";
import products from "@/data/products.json";

const AllProducts = () => {
  return (
    <main className="min-h-screen  pt-50 pb-60 text-white">
      <section className="mx-auto w-11/12">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
            Summer Collection
          </p>

          <h1 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
            All{" "}
            <span className="bg-linear-to-r from-teal-300 to-yellow-300 bg-clip-text text-transparent">
              Products
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm md:text-md lg:text-lg font-medium leading-7 text-white/60 md:text-base">
            Explore all summer essentials with clean design, smooth animation,
            and premium product cards.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default AllProducts;

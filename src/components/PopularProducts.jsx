"use client";

import ProductCard from "./ProductCardUi";

const PopularProducts = ({ products = [] }) => {
  return (
    <section className="mx-auto w-11/13 max-w-8xl mt-30">
      <div className="mb-10">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-400">
          Featured
        </p>

        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
          Popular, <span className="text-amber-400">Products</span>
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;

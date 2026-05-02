import products from "@/data/products.json";

export default function TopBrands() {
  const brands = [...new Set(products.slice(0, 4).map((item) => item.brand))];

  return (
    <section className="w-full md:w-11/11 lg:w-11/12  mx-auto overflow-hidden mt-28 md:mt-45">
      <div className="mx-auto w-11/12">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-white md:mb-14 md:text-5xl">
          Top <span className=" text-yellow-400 bg-clip-text">brands</span>
        </h2>

        <div className="group relative overflow-hidden p-2">
          <div className="flex w-max animate-brandMoveSlow gap-3 sm:gap-4 md:gap-6 group-hover:[animation-play-state:paused]">
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand}-${index}`}
                className="flex h-14 min-w-32 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-extrabold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-3  hover:border-teal-400 hover:text-yellow-400 hover:shadow-[0_0_35px_rgba(45,212,191,0.35)] sm:h-16 sm:min-w-40 sm:px-6 sm:text-base md:h-20 md:min-w-52 md:rounded-2xl md:px-8 md:text-lg lg:h-24 lg:min-w-60 lg:px-10"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

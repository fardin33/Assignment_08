import { ShoppingBag } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10 text-white border-t border-white/10">
      <div className="mx-auto w-11/12 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 group">
            <span className="rounded-full bg-amber-400 p-2 text-teal-800 shadow-lg shadow-amber-500/20 transition group-hover:scale-110">
              <ShoppingBag size={20} />
            </span>

            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-extrabold text-white bg-clip-text">
              Summer<span className="text-yellow-400">Store</span>
            </h2>
          </div>

          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            Your one-stop summer essentials store. Explore trending products
            with the best deals and smooth shopping experience.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/70">
            {["Home", "Shop", "Categories", "Contact"].map((item) => (
              <li
                key={item}
                className="hover:text-teal-400 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-bold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm text-white/70">
            {["Accessories", "Clothing", "Electronics", "Beauty"].map(
              (item) => (
                <li
                  key={item}
                  className="hover:text-teal-400 transition cursor-pointer"
                >
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
          <p className="text-sm text-white/70 mb-4">
            Get latest offers and updates.
          </p>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent px-4 py-2 text-sm outline-none text-white placeholder:text-white/50"
            />
            <button className="bg-teal-800 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Part : */}
      <div className="border-t border-white/10 py-4 text-center text-sm text-white/60">
        © {new Date().getFullYear()} SunCart. All rights reserved.
      </div>
    </footer>
  );
}

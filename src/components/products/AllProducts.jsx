// "use client";

// import ProductCard from "@/components/ui/ProductCardUi";
// import products from "@/data/products.json";

// const AllProducts = () => {
//   return (
//     <main className="min-h-screen  pt-50 pb-60 text-white">
//       <section className="mx-auto w-11/12">
//         {/* Section Header */}
//         <div className="mb-14 text-center">
//           <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
//             Summer Collection
//           </p>

//           <h1 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
//             All{" "}
//             <span className="bg-linear-to-r from-teal-300 to-yellow-300 bg-clip-text text-transparent">
//               Products
//             </span>
//           </h1>

//           <p className="mx-auto mt-5 max-w-xl text-sm md:text-md lg:text-lg font-medium leading-7 text-white/60 md:text-base">
//             Explore all summer essentials with clean design, smooth animation,
//             and premium product cards.
//           </p>
//         </div>

//         {/* Product Grid */}
//         <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {products.map((product, index) => (
//             <ProductCard key={product.id} product={product} index={index} />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default AllProducts;

// "use client";

// import { useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import ProductCard from "@/components/ui/ProductCardUi";
// import products from "@/data/products.json";
// import { authClient } from "@/lib/auth-client";

// const AllProducts = () => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const { data: session, isPending } = authClient.useSession();

//   useEffect(() => {
//     if (!isPending && !session?.user) {
//       router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
//     }
//   }, [isPending, session, pathname, router]);

//   if (isPending || !session?.user) {
//     return (
//       <main className="flex min-h-screen items-center justify-center px-4 text-white">
//         <div className="rounded-3xl border border-white/10 bg-white/10 px-8 py-6 text-sm font-bold backdrop-blur-xl">
//           Checking login...
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen pt-50 pb-60 text-white">
//       <section className="mx-auto w-11/12">
//         {/* Section Header */}
//         <div className="mb-14 text-center">
//           <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-yellow-300">
//             Summer Collection
//           </p>

//           <h1 className="text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
//             All{" "}
//             <span className="bg-linear-to-r from-teal-300 to-yellow-300 bg-clip-text text-transparent">
//               Products
//             </span>
//           </h1>

//           <p className="mx-auto mt-5 max-w-xl text-sm md:text-md lg:text-lg font-medium leading-7 text-white/60 md:text-base">
//             Explore all summer essentials with clean design, smooth animation,
//             and premium product cards.
//           </p>
//         </div>

//         {/* Product Grid */}
//         <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {products.map((product, index) => (
//             <ProductCard key={product.id} product={product} index={index} />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default AllProducts;

"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lottie from "lottie-react";

import ProductCard from "@/components/ui/ProductCardUi";
import products from "@/data/products.json";
import { authClient } from "@/lib/auth-client";
import loadingAnimation from "@/assets/Insider-loading.json";

const AllProducts = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showLoading && !isPending && !session?.user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [showLoading, isPending, session, pathname, router]);

  if (showLoading || isPending || !session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 text-white">
        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur-xl">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            className="h-38 w-38 md:h-42 md:w-42 lg:h-46 lg:w-46"
          />

          <p className="mt-4 text-sm font-bold text-white/70">
            Checking login...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-50 pb-60 text-white">
      <section className="mx-auto w-11/12">
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

          <p className="mx-auto mt-5 max-w-xl text-sm font-medium leading-7 text-white/60 md:text-base lg:text-lg">
            Explore all summer essentials with clean design, smooth animation,
            and premium product cards.
          </p>
        </div>

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

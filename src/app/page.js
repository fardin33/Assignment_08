import Hero from "@/components/Hero";
import PopularProducts from "@/components/PopularProducts";
import SummerTips from "@/components/SummerTips";
import TopBrands from "@/components/TopBrands";
import { getProducts } from "@/lib/getProducts";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <PopularProducts products={products} />
      <SummerTips products={products} />
      <TopBrands products={products} />
    </>
  );
}

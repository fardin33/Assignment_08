import Hero from "@/components/home/Hero";
import PopularProducts from "@/components/home/PopularProducts";
import SummerTips from "@/components/home/SummerTips";
import TopBrands from "@/components/home/TopBrands";
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

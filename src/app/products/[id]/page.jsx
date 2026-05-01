import ProductDetails from "@/components/ProductDetails";
import { getProducts } from "@/lib/getProducts";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const products = await getProducts();

  const product = products.find((item) => item.id === Number(id));

  if (!product) return notFound();

  return <ProductDetails product={product} />;
}

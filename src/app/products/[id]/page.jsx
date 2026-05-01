import { products } from "@/lib/products";
import ProductDetails from "@/components/ProductDetails";
import { notFound } from "next/navigation";

export default function ProductDetailsPage({ params }) {
  const product = products.find((item) => item.id === params.id);

  if (!product) return notFound();

  return <ProductDetails product={product} />;
}

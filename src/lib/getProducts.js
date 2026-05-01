import products from "@/data/products.json";

export async function getProducts() {
  try {
    return products;
  } catch (error) {
    console.error("Product load error:", error);
    return [];
  }
}

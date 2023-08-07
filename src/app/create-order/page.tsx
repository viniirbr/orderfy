import { ProductsGrid } from "@/components/ProductsGrid";
import { axiosBase } from "@/shared/api";
import { Product } from "@/shared/interfaces/Product";

export default async function CreateOrderPage() {
  try {
    const products = (await axiosBase.get<Product[]>("/api/products")).data;

    return (
      <div>
        <ProductsGrid products={products} />
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}

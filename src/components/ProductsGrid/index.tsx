import { Product } from "@/shared/interfaces/Product";
import { ProductItem } from "./ProductItem";

interface Props {
  products: Product[];
}

export function ProductsGrid({ products }: Props) {
  const categories = [...new Set(products.map((product) => product.category))];
  return (
    <div className="flex flex-col">
      {categories.map((category) => (
        <section key={category}>
          <h2 className="font-bold text-lg">{category}</h2>
          <div className="grid grid-cols-3 gap-4">
            {products
              .filter((product) => product.category === category)
              .map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

import { Product } from "@/shared/interfaces/Product";
import { ProductItem } from "./ProductItem";

interface Props {
  products: Product[];
  orderSelected: string;
}

export function ProductsGrid({ products, orderSelected }: Props) {
  const categories = [...new Set(products.map((product) => product.category))];
  return (
    <div className="flex flex-col md:w-4/5">
      {categories.map((category) => (
        <section key={category} className="mt-4 w-full">
          <h2 className="font-bold text-lg">{category}</h2>
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products
              .filter((product) => product.category === category)
              .map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  orderSelected={orderSelected}
                />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

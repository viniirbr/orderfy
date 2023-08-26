import { ProductOnOrder } from "./Product";

export interface Order {
  id: string;
  customer: string;
  products: ProductOnOrder[];
}

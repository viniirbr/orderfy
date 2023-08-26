export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  category: string;
}

export interface ProductOnOrder extends Product {
  quantity: number;
}

import { Order } from "./Order";
import { User } from "./User";

export interface Cart {
  id: string;
  customer: User;
  orders: Order[];
  due: Date;
  status: string;
}

export interface ICreateCart {
  id: string;
  orders: Order[];
}

export interface ICartListResponse {
  id: string;
  due: Date;
  status: "RECEIVED" | "CREATING";
  customer: {
    id: string;
    name: string;
    company: string;
  };
}

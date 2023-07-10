import { Order } from "@/shared/interfaces/Order";
import { axiosBase } from "@/shared/api";
import { OrderCard } from "@/components/OrdersList/OrderCard";
import { OrdersList } from "@/components/OrdersList";

export default async function Admin() {
  try {
    const ordersResponse = await axiosBase.get<Order[]>("api/orders");

    return (
      <main className="min-h-screen w-full py-14 px-4 sm:px-14 md:px-28 lg:px-64">
        <OrdersList orders={ordersResponse.data} />
      </main>
    );
  } catch (error) {
    console.log(error);
  }
}

"use client";
import { BsChevronDown } from "react-icons/bs";
import { Dispatch, SetStateAction } from "react";
import { RiDeleteBin6Fill as DeleteBin } from "react-icons/ri";
import { Order } from "@/shared/interfaces/Order";
import { axiosBase } from "@/shared/api";
import { useRouter } from "next/navigation";

interface Props {
  order: Order;
  isSelected: boolean;
  setOrderSelected: Dispatch<SetStateAction<string>>;
  resetOrderSelection: () => void;
}

export function CartItem({
  order,
  isSelected,
  setOrderSelected,
  resetOrderSelection,
}: Props) {
  const router = useRouter();
  const categories = [
    ...new Set(order.products.map((product) => product.category)),
  ];

  async function deteteProductFromCart(productId: string) {
    try {
      const result = await axiosBase.delete(`/orders/${order.id}/${productId}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteOrder() {
    try {
      const result = await axiosBase.delete(`/orders/${order.id}`);
      router.refresh();
      resetOrderSelection();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <li
      className={`p-2 cursor-default rounded-lg transition-all max-h-48 overflow-y-auto py-2 ${
        isSelected && "bg-blue-400 hover:bg-blue-500"
      } ${isSelected || "hover:bg-gray-500 cursor-pointer"}`}
      onClick={() => setOrderSelected(order.id)}
    >
      <header className="flex items-center justify-between">
        <h2 className="font-bold">{order.customer}</h2>
        <BsChevronDown
          className={`transition-all ${isSelected && "rotate-180"}`}
        />
      </header>
      {isSelected && (
        <ul className="mt-2 flex flex-col gap-2">
          {order.products.length === 0 && (
            <p className="text-sm text-center">
              No products for this customer. You want to{" "}
              <b
                className="font-bold underline cursor-pointer"
                onClick={deleteOrder}
              >
                delete
              </b>
              ?
            </p>
          )}
          {categories.map((category, id) => (
            <section key={id}>
              <h2 className="text-sm font-semibold">{category}</h2>
              {order.products
                .filter((product) => product.category === category)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((product) => (
                  <li
                    key={product.id}
                    className="text-sm flex items-center justify-between"
                  >
                    <h2 className="font-bold">{product.quantity}x</h2>
                    <h3>{product.name}</h3>
                    <DeleteBin
                      color="#750000"
                      size={18}
                      className="cursor-pointer"
                      onClick={() => deteteProductFromCart(product.id)}
                    />
                  </li>
                ))}
            </section>
          ))}
        </ul>
      )}
    </li>
  );
}

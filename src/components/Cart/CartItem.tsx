"use client";
import { BsChevronDown } from "react-icons/bs";
import { LuEdit2 } from "react-icons/lu";
import { Dispatch, SetStateAction, useState } from "react";
import { RiDeleteBin6Fill as DeleteBin } from "react-icons/ri";
import { Order } from "@/shared/interfaces/Order";
import { axiosBase } from "@/shared/api";
import { useRouter } from "next/navigation";
import { EditInput } from "./EditInput";

interface Props {
  order: Order;
  isSelected: boolean;
  setOrderSelected: Dispatch<SetStateAction<string>>;
  resetOrderSelection: () => void;
  cartId: string;
}

export function CartItem({
  order,
  isSelected,
  setOrderSelected,
  resetOrderSelection,
  cartId,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
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

  async function onEditCustomerName(customerName: string) {
    try {
      const result = await axiosBase.put(`/orders/${order.id}`, {
        customerName,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <li
      className={`p-2 cursor-default rounded-lg transition-all max-h-48 overflow-y-auto py-2 min-w-[200px] ${
        isSelected && "bg-blue-400 hover:bg-blue-500"
      } ${isSelected || "hover:bg-gray-500 cursor-pointer"}`}
      onClick={() => setOrderSelected(order.id)}
    >
      <header className="flex items-center justify-between">
        {isEditing ? (
          <EditInput
            setOrderSelected={setOrderSelected}
            setEditing={setIsEditing}
            onSave={onEditCustomerName as any}
          />
        ) : (
          <>
            <h2 className="font-bold">{order.customer}</h2>
            <div className="flex items-center gap-2 text-sm font-bold">
              {isSelected && (
                <LuEdit2
                  className="cursor-pointer"
                  onClick={() => setIsEditing((prev) => !prev)}
                />
              )}
              <BsChevronDown
                className={`transition-all ${isSelected && "rotate-180"}`}
              />
            </div>
          </>
        )}
      </header>
      {isSelected && (
        <ul className="mt-2 flex flex-col gap-2">
          {order.products.length === 0 && (
            <h4 className="text-sm text-center">
              No products for this customer.
              {order.customer !== "You" && (
                <p>
                  You want to{" "}
                  <b
                    className="font-bold underline cursor-pointer"
                    onClick={deleteOrder}
                  >
                    delete
                  </b>
                  ?
                </p>
              )}
            </h4>
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

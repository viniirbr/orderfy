"use client";

import { Input } from "@/components/UI/Inputs/Input";
import { useState } from "react";
import { Button } from "@/components/UI/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [form, setForm] = useState<{
    customerName: string;
    customerEmail: string;
    company: string;
    address: string;
    orderText: string;
    time: string;
  }>({
    customerName: "",
    customerEmail: "",
    company: "",
    address: "",
    orderText: "",
    time: "",
  });

  async function handleOrderSubmission(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (response.status !== 201) throw new Error(response.statusText);
      toast.success("Order placed successfully");
      setForm({
        customerName: "",
        customerEmail: "",
        company: "",
        address: "",
        orderText: "",
        time: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center py-14 px-4 sm:px-14">
      <form
        onSubmit={handleOrderSubmission}
        className="flex flex-col gap-3 w-full items-center"
      >
        <Input
          label="Name"
          type="text"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, customerName: e.target.value }))
          }
          value={form.customerName}
          required
        />
        <Input
          label="Email"
          type="email"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, customerEmail: e.target.value }))
          }
          value={form.customerEmail}
          required
        />
        <Input
          label="Company"
          type="text"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, company: e.target.value }))
          }
          value={form.company}
          required
        />
        <Input
          label="Address"
          type="text"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, address: e.target.value }))
          }
          value={form.address}
        />
        <Input
          label="Time"
          type="datetime-local"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, time: e.target.value }))
          }
          value={form.time}
          required
        />
        <Input
          label="Order details"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, orderText: e.target.value }))
          }
          value={form.orderText}
          isTextArea
          required
        />
        <Button type="submit" title="Order" />
      </form>
      <ToastContainer />
    </main>
  );
}

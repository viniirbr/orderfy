import { CreateOrderShema } from "@/schema/order";
import { publicProcedure, router } from "../trpc";
import { nanoid } from "nanoid";

export const orderRouter = router({
  createOrder: publicProcedure
    .input(CreateOrderShema)
    .mutation(async ({ input, ctx }) => {
      const { customerEmail, customerName, company, address, time, orderText } =
        input;
      const order = await ctx.prisma.order.create({
        data: {
          id: nanoid(8),
          customerEmail,
          customerName,
          company,
          time,
          address,
          orderText,
        },
      });
      return order;
    }),
});

import { authOptions } from "../../app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "../../../prisma/client";
import { CartCard } from "@/components/CartsList/CartCard";

// export default async function Customer() {
//   console.log("CUSTOMER HOME");
//   try {
//     // const session = await getServerSession(authOptions);
//     const carts = await prisma.cart.findMany({
//       where: {
//         status: "RECEIVED" || "PREPARING",
//         due: {
//           gte: new Date(),
//         },
//       },
//       orderBy: {
//         due: "asc",
//       },
//       include: {
//         customer: true,
//       },
//     });
//     // const dates = carts.map((cart) => {
//     //   const date = cart.due;
//     //   date?.setHours(0);
//     //   date?.setMinutes(0);
//     //   date?.setSeconds(0);
//     //   date?.setMilliseconds(0);
//     //   return date?.toDateString();
//     // });
//     // const uniqueDates = [...new Set(dates)];
//     const dates = [...new Set(carts.map((cart) => cart.due))];

//     return (
//       <main className="flex justify-center min-h-fit w-full py-14 px-4 sm:px-14 md:px-28 lg:px-64">
//         <div className="flex flex-col w-full items-center max-w-lg">
//           <h1 className="my-5 text-2xl font-bold self-start">
//             Incoming orders
//           </h1>
//           {/* {carts.length > 0 ? (
//             dates.map((date, id) => (
//               <section key={id} className="w-full">
//                 <h2 className="font-semibold">{date?.toDateString()}</h2>
//                 <ol className="flex flex-col items-center gap-2 mt-4">
//                   {carts.map((cart) => (
//                     <li key={cart.id} className="w-full flex justify-center">
//                       <CartCard cart={cart as any} />
//                     </li>
//                   ))}
//                 </ol>
//               </section>
//             ))
//           ) : (
//             <div className="min-h-[400px] flex items-center justify-center">
//               <p className="font-bold text-lg">No incoming orders</p>
//             </div>
//           )} */}
//         </div>
//       </main>
//     );
//   } catch (error) {
//     console.log("ERROR", error);
//   }
// }

export default function Whatever() {
  return <p>BLE</p>;
}

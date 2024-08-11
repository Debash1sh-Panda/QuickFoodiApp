import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../urls";

function Orders() {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `${baseUrl}/api/payments?email=${user.email}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data.orders || []; // Ensure that 'orders' is returned as an array
    },
  });

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="sm:py-32 py-16 flex flex-col justify-between items-center gap-8">
        <div className="flex items-center justify-center space-y-7 px-3 order-2 md:order-1">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Track All Your{" "}
            <span className="text-[#164A41] font-bold">ORDERS</span>
          </h2>
        </div>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="table mb-28">
            {/* head */}
            <thead className="bg-[#F1B24A] text-black rounded-md">
              <tr>
                <th>#</th>
                <th>Order Date</th>
                <th>Transaction ID</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {orders.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.createdAt}</td>
                  <td className=" text-gray-500">{item.transitionId}</td>
                  <td>{item.price}</td>
                  <td className="text-warning">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;

"use client";

import { GetOrderById, GetUserOrderByEmail } from "@/src/app/api/order";
import { useState } from "react";
import { useEffect } from "react";
import OrderDetails from "./OrderDetails";
import { Skeleton, Typography } from "@mui/material";

export default function OrderList({ isEmail = false, orderId, orderEmail }) {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);

      let res;
      if (isEmail) {
        res = await GetUserOrderByEmail(orderEmail);
      } else {
        res = await GetOrderById(orderId);
      }

      if (res.status !== 200) {
        setOrders([]);
        setLoading(false);
        return;
      }

      if (isEmail) {
        setOrders(res.data?.orders || []);
      } else {
        setOrders([res.data]);
      }

      setLoading(false);
    };

    getOrders();
  }, []);

  return (
    <div>
      <div className="header flex items-center justify-center">
        <Typography variant="h5">Order List</Typography>
      </div>
      {loading ? (
        <Skeleton
          variant="rounded"
          height="50vh"
          className="w-full max-w-4xl mx-auto"
        />
      ) : orders.length > 0 ? (
        <div className="flex flex-col gap-2">
          {orders.map((order, id) => (
            <OrderDetails key={id} order={order} />
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

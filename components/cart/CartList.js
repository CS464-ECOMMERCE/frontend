"use client";
import { useEffect, useState } from "react";
import CartCard from "./CartCard";
import { Box, Typography } from "@mui/material";
import { GetCartDetails } from "@/src/app/api/cart";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function CartList({ loading, updateItems }) {
  const [items, setItems] = useState({});
  const router = useRouter();
  const cartRedux = useSelector((state) => state.cart.items); // to manage state changes

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetCartDetails();
      if (res.status !== 200) {
        router.push(`/400?message=${res.error}`);
        return;
      }
      const itemsObject = res.data.reduce(
        (acc, item) => ((acc[item.id] = item), acc),
        {}
      );
      setItems(itemsObject);
    };

    if (cartRedux.length > 0) {
      fetchData();
    } else {
      setItems({});
    }
  }, [cartRedux]);

  // update parent's state
  useEffect(() => {
    updateItems(items);
  }, [items]);

  return (
    <>
      {loading ? (
        <Box className="cart-list">
          {Array.from({ length: 3 }).map((_, i) => (
            <CartCard key={i} loading />
          ))}
        </Box>
      ) : !items || Object.keys(items).length === 0 ? (
        <Box className="cart-list">
          <Typography variant="h6">
            No items in cart.{" "}
            <a href="/shop" className="text-blue-500 underline">
              Start shopping now!
            </a>
          </Typography>
        </Box>
      ) : (
        <Box className="cart-list">
          {Object.entries(items).map(([key, item], index) => (
            <CartCard key={index} item={item} setItem={setItems} />
          ))}
        </Box>
      )}
    </>
  );
}

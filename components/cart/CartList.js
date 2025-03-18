"use client";
import { useEffect, useState } from "react";
import CartCard from "./CartCard";
import { Box } from "@mui/material";
import { GetCartDetails } from "@/api/cart";
import { useRouter } from "next/navigation";

export default function CartList({ loading, updateItems }) {
  const [items, setItems] = useState({});
  const router = useRouter();

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
    fetchData();
  }, []);

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

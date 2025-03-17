import { useEffect, useState } from "react";
import CartCard from "./CartCard";
import { Box } from "@mui/material";
import { GetCartDetails } from "@/api/cart";

export default function CartList({ loading, updateItems }) {
  const [items, setItems] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetCartDetails();
      const itemsObject = res.reduce(
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

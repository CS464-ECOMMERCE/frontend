import { useEffect, useState } from "react";
import CartCard from "./CartCard";
import { Box } from "@mui/material";

const itemPlaceholder = [
  {
    id: 1,
    name: "Product 1",
    price: 100.5,
    quantity: 1,
    maxQuantity: 1,
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    quantity: 2,
    maxQuantity: 5,
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    quantity: 3,
    maxQuantity: 10,
  },
];

export default function CartList({ loading, updateItems }) {
  const itemsObject = itemPlaceholder.reduce(
    (acc, item) => ((acc[item.id] = item), acc),
    {}
  );
  const [items, setItems] = useState(itemsObject);
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
          {Object.entries(items).map(([key, item], _) => (
            <CartCard key={item.id} item={item} setItem={setItems} />
          ))}
        </Box>
      )}
    </>
  );
}

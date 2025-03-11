import CartCard from "./CartCard";
import { Box } from "@mui/material";

const items = [
  {
    id: 1,
    name: "Product 1",
    price: 100.50,
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

export default function CartList() {
  return (
    <Box className="cart-list">
      {items.map((item, i) => (
        <CartCard key={item} item={item} />
      ))}
    </Box>
  );
}

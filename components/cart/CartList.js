import CartCard from "./CartCard";
import { Box } from "@mui/material";

export default function CartList() {
  return (
    <Box className="cart-list">
      {Array.from({ length: 12 }).map((_, i) => (
        <CartCard key={i} />
      ))}
    </Box>
  );
}

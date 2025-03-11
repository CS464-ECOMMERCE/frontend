import CartCard from "@/components/cart/CartCard";
import CartCheckout from "@/components/cart/CartCheckout";
import { Grid2 } from "@mui/material";
import "@/components/cart/cart.css";
import CartList from "@/components/cart/CartList";

export default function Page() {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 8 }}>
        <CartList />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <CartCheckout />
      </Grid2>
    </Grid2>
  );
}

"use client";
import CartCheckout from "@/components/cart/CartCheckout";
import { Grid2 } from "@mui/material";
import "@/components/cart/cart.css";
import CartList from "@/components/cart/CartList";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (items) {
      setLoading(false);
    }
  }, [items]);

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 8 }}>
        <CartList loading={loading} updateItems={setItems} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <CartCheckout loading={loading} items={items} />
      </Grid2>
    </Grid2>
  );
}

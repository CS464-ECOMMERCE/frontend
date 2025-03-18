"use client";
import { ShoppingCart } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CartTrolleyButton() {
  const router = useRouter();
  const [cartLength, setCartLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    if (items) {
      setCartLength(items.length);
      setLoading(false);
    }
  }, [items]);

  return (
    <IconButton color="inherit">
      {loading ? (
        <ShoppingCart />
      ) : (
        <Badge
          badgeContent={cartLength}
          color="secondary"
          onClick={() => router.push("/cart")}
        >
          <ShoppingCart />
        </Badge>
      )}
    </IconButton>
  );
}

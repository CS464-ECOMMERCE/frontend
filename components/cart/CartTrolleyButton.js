"use client";
import { GetCart } from "@/api/cart";
import { ShoppingCart } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartTrolleyButton() {
  const router = useRouter();
  const [cartLength, setCartLength] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await GetCart();
      setCartLength(res.length);
      setLoading(false);
    };
    fetchCart();
  }, []);

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

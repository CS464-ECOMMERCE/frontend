"use client";
import { ShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";

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
    <Button variant="ghost" color="white" onClick={() => router.push("/cart")}>
      {loading ? (
        <ShoppingCart sx={{ scale: 1.5 }} />
      ) : (
        <Badge badgeContent={cartLength} color="secondary">
          <ShoppingCart sx={{ scale: 1.5 }} />
        </Badge>
      )}
    </Button>
  );
}

"use client";
import { ShoppingCart } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Typography } from "@mui/material";
import { AddItemToCart } from "@/src/app/api/cart";
import CustomSnackbar from "../CustomSnackbar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToLocalCart } from "@/store/cartSlice";
import { useSession } from "next-auth/react";

export default function AddToCartButton({ id, quantity }) {
  const { data: session } = useSession();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    const res = await AddItemToCart(id, quantity);
    if (res.status !== 200) {
      setSnackbar({
        open: true,
        message: res.error,
        severity: "error",
      });
      return;
    }

    setSnackbar({
      open: true,
      message: "Item added to cart",
      severity: "success",
    });
    dispatch(addToLocalCart({ id, quantity }));
  };

  return (
    <>
      {!session && (
        <Button variant="default" onClick={handleAddToCart}>
          <ShoppingCart />
          <Typography variant="body2">Add to Cart</Typography>
        </Button>
      )}

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
      />
    </>
  );
}

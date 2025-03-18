"use client";
import { ShoppingCart } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Typography } from "@mui/material";
import { AddItemToCart } from "@/api/cart";
import CustomSnackbar from "../CustomSnackbar";
import { useState } from "react";

export default function AddToCartButton({ id, quantity }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleAddToCart = async () => {
    const res = await AddItemToCart(id, quantity);
    if (res.status !== 200) {
      setSnackbarOpen(true);
      setSnackbarMsg(res.error);
      setSnackbarSeverity("error");
      return;
    }

    setSnackbarOpen(true);
    setSnackbarMsg("Item added to cart");
    setSnackbarSeverity("success");
  };

  return (
    <>
      <Button variant="default" onClick={handleAddToCart}>
        <ShoppingCart />
        <Typography variant="body2">Add to Cart</Typography>
      </Button>

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMsg}
        onClose={() => setSnackbarOpen(false)}
        severity={snackbarSeverity}
      />
    </>
  );
}

"use client";
import { ShoppingBasket } from "@mui/icons-material";
import { Alert, Divider, Typography } from "@mui/material";
import ProductQuantitySelector from "./ProductQuantitySelector";

export default function ProductDetails() {
  const sold = 5493;
  const money = 34.12;
  const maxQuantity = 10;

  return (
    <div className="flex flex-col gap-8">
      <Typography variant="h3">Product Name</Typography>
      <Divider />{" "}
      <div className="flex items-center gap-5">
        <ShoppingBasket sx={{ color: "gray" }} />
        <Typography variant="normal" color="gray">
          {sold} products sold
        </Typography>
      </div>
      <Alert severity="info" icon={false}>
        <Typography variant="h4">$ {money}</Typography>
      </Alert>
      <Typography variant="body1">Quantity: {maxQuantity}</Typography>
      <ProductQuantitySelector maxQuantity={maxQuantity} />
      <Typography variant="h3">Product Details</Typography>
      <Divider />
      <Typography variant="body1">Product Details</Typography>
    </div>
  );
}

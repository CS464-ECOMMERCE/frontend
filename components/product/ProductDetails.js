"use client";
import { ShoppingBasket } from "@mui/icons-material";
import { Alert, Divider, Typography } from "@mui/material";
import ProductQuantitySelector from "./ProductQuantitySelector";
import ProductTabs from "./ProductTabs";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";

export default function ProductDetails({ item }) {
  const { title, sold, price, maxQuantity } = item;
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-8">
      <Typography variant="h3">{title}</Typography>
      <Divider />{" "}
      <div className="flex items-center gap-5">
        <ShoppingBasket sx={{ color: "gray" }} />
        <Typography variant="normal" color="gray">
          {sold} products sold
        </Typography>
      </div>
      <Alert severity="info" icon={false}>
        <Typography variant="body2" color="gray">
          Unit Price: $ {price.toFixed(2)}
        </Typography>
        <Typography variant="h4">$ {(price * quantity).toFixed(2)}</Typography>
      </Alert>
      <Typography variant="body1">Quantity: {maxQuantity}</Typography>
      <ProductQuantitySelector
        currentQuantity={quantity}
        maxQuantity={maxQuantity}
        onQuantityChange={setQuantity}
      />
      <AddToCartButton />
      <Divider />
      <ProductTabs />
    </div>
  );
}

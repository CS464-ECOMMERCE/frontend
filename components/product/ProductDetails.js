"use client";
import { ShoppingBasket } from "@mui/icons-material";
import { Alert, Divider, Skeleton, Typography } from "@mui/material";
import ProductQuantitySelector from "./ProductQuantitySelector";
import ProductTabs from "./ProductTabs";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";

export default function ProductDetails({ item, loading, isAdmin }) {
  const { name, sold, price, quantity: maxQuantity } = item;
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <Skeleton variant="text" width={300} height={40} />
        <Divider />
        <div className="flex items-center gap-5">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={200} height={30} />
        </div>
        <Skeleton variant="rectangular" width="100%" height={80} />
        <Skeleton variant="text" width={100} height={30} />
        <Skeleton variant="rectangular" width="100%" height={50} />
        <Skeleton variant="rectangular" width="100%" height={50} />
        <Divider />
        <Skeleton variant="rectangular" width="100%" height={200} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Typography variant="h3">{name}</Typography>
      <Divider />{" "}
      {/* <div className="flex items-center gap-5">
        <ShoppingBasket sx={{ color: "gray" }} />
        <Typography variant="normal" color="gray">
          {sold} products sold
        </Typography>
      </div> */}
      <Alert severity="info" icon={false}>
        <Typography variant="body2" color="gray">
          Unit Price: $ {price.toFixed(2)}
        </Typography>
        <Typography variant="h4">$ {(price * quantity).toFixed(2)}</Typography>
      </Alert>
      <Typography variant="body1">Quantity: {maxQuantity}</Typography>
      {isAdmin ? null : (
        <>
          <ProductQuantitySelector
            currentQuantity={quantity}
            maxQuantity={maxQuantity}
            onQuantityChange={setQuantity}
          />
          <AddToCartButton />
        </>
      )}
      <Divider />
      <ProductTabs />
    </div>
  );
}

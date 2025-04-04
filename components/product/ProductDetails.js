"use client";
import { Alert, Divider, Skeleton, Typography } from "@mui/material";
import ProductQuantitySelector from "./ProductQuantitySelector";
import ProductTabs from "./ProductTabs";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";

export default function ProductDetails({ item, loading, isAdmin }) {
  const { id, name, price, inventory: maxQuantity, description } = item;
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
        <Divider />
        <Skeleton variant="rectangular" width="100%" height={200} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <Typography variant="h5">{name}</Typography>
      <Divider />{" "}
      {isAdmin ? (
        <>
          <Alert severity="info" icon={false}>
            <Typography variant="body2">
              Unit Price: $ {price.toFixed(2)}
            </Typography>
          </Alert>
          <Typography variant="body2">Inventory: {maxQuantity}</Typography>
        </>
      ) : (
        <>
          <Alert severity="info" icon={false}>
            <Typography variant="body2" color="gray">
              Unit Price: $ {price.toFixed(2)}
            </Typography>
            <Typography variant="h6">
              {maxQuantity > 0
                ? `$${(price * quantity).toFixed(2)}`
                : "Out of stock"}
            </Typography>
          </Alert>
          <Typography variant="body2">Quantity: {maxQuantity}</Typography>
          <ProductQuantitySelector
            currentQuantity={maxQuantity > 0 ? quantity : 0}
            maxQuantity={maxQuantity}
            onQuantityChange={setQuantity}
          />
          <AddToCartButton id={item.id} quantity={quantity} />
        </>
      )}
      <Typography variant="body2" color="gray">
        SKU: {id}
      </Typography>
      <Divider />
      <ProductTabs description={description} />
    </div>
  );
}

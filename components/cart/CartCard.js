"use client";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import CartDeleteButton from "./CartDeleteButton";
import ProductQuantitySelector from "../product/ProductQuantitySelector";
import { useState } from "react";

export default function CartCard({ item }) {
  const { price, maxQuantity, title } = item;

  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <Card className="cart-container" elevation={2}>
      <CardContent className="content">
        <CardMedia
          image="https://plus.unsplash.com/premium_photo-1741109190036-cbd11154bc65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D"
          className="img"
        />

        <div className="content-container">
          <div className="details">
            <div>
              <Typography variant="body1">{title ?? "Title"}</Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Unit Price: $ {price.toFixed(2) ?? 34.12}
              </Typography>
            </div>

            <ProductQuantitySelector
              currentQuantity={quantity}
              maxQuantity={maxQuantity}
              onQuantityChange={setQuantity}
            />
          </div>

          <div className="total-actions">
            <Typography variant="body2" className="total">
              $ {price && quantity ? (price * quantity).toFixed(2) : 34.12}
            </Typography>

            <div className="actions">
              <CartDeleteButton />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

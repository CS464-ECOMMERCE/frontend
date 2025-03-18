"use client";
import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import CartDeleteButton from "./CartDeleteButton";
import ProductQuantitySelector from "../product/ProductQuantitySelector";
import { useEffect, useState } from "react";

export default function CartCard({ loading, item, setItem }) {
  const { price, inventory, name } = item ?? {};

  const [quantity, setQuantity] = useState(item?.quantity ?? 1);

  useEffect(() => {
    if (item) {
      setItem((prev) => ({
        ...prev,
        [item.id]: {
          ...item,
          quantity,
        },
      }));
    }
  }, [quantity]);

  return (
    <>
      {loading ? (
        <Card className="cart-container" elevation={2}>
          <CardContent className="content">
            <Skeleton
              variant="rectangular"
              className="img"
              width={150}
              height={150}
            />
            <div className="content-container">
              <div className="details">
                <div>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </div>
                <Skeleton variant="rectangular" width={100} height={40} />
              </div>
              <div className="total-actions">
                <Skeleton variant="text" width="30%" className="total" />
                <Skeleton variant="circular" width={40} height={40} />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="cart-container" elevation={2}>
          <CardContent className="content">
            <CardMedia
              image="https://plus.unsplash.com/premium_photo-1741109190036-cbd11154bc65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D"
              className="img"
            />

            <div className="content-container">
              <div className="details">
                <div>
                  <Typography variant="body1">{name ?? "Name"}</Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    Unit Price: $ {price.toFixed(2) ?? 34.12}
                  </Typography>
                </div>

                <ProductQuantitySelector
                  currentQuantity={quantity}
                  maxQuantity={inventory}
                  onQuantityChange={setQuantity}
                />
              </div>

              <div className="total-actions">
                <Typography variant="body2" className="total">
                  $ {price && quantity ? (price * quantity).toFixed(2) : 34.12}
                </Typography>

                <div className="actions">
                  <CartDeleteButton id={item.id} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

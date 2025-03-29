"use client";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import ProductQuantitySelector from "../product/ProductQuantitySelector";
import { useEffect, useRef, useState } from "react";
import { RemoveItemFromCart, UpdateItemQuantity } from "@/src/app/api/cart";
import { useDispatch } from "react-redux";
import { removeFromLocalCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import { Delete } from "@mui/icons-material";

export default function CartCard({ loading, item, setItem }) {
  const { price, inventory, name } = item ?? {};
  const [quantity, setQuantity] = useState(item?.quantity ?? 1);
  const dispatch = useDispatch();
  const debounceTimeout = useRef(null); // Ref to store the timeout ID
  const router = useRouter();

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

  const handleDeleteClick = async () => {
    const res = await RemoveItemFromCart(item.id);
    if (res.status !== 200) {
      return;
    }
    setItem((prev) => {
      delete prev[item.id];
      return { ...prev }; // return a new object to trigger re-render
    });
    dispatch(removeFromLocalCart({ id: item.id }));
  };

  const handleQuantityChange = async (newQuantity) => {
    // Clear the previous timeout if it exists
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    setQuantity(newQuantity); // Update local state

    // Set a new timeout to delay the update
    // Call API when the user stops spamming for 500ms
    debounceTimeout.current = setTimeout(async () => {
      await UpdateItemQuantity(item.id, newQuantity);
    }, 500); // 500ms delay
  };

  const handleCardClicked = () => {
    router.push(`/shop/${item.id}`);
  };

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
        <Card
          className="cart-container clickable-card"
          elevation={2}
          onClick={() => handleCardClicked()}
        >
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
                    Unit Price: $ {price.toFixed(2) ?? 0}
                  </Typography>
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                  <ProductQuantitySelector
                    currentQuantity={quantity}
                    maxQuantity={inventory}
                    onQuantityChange={(v) => handleQuantityChange(v)}
                  />
                </div>
              </div>

              <div className="total-actions">
                <Typography variant="body2" className="total">
                  $ {price && quantity ? (price * quantity).toFixed(2) : 0}
                </Typography>

                <div className="actions" onClick={(e) => e.stopPropagation()}>
                  <IconButton onClick={() => handleDeleteClick()}>
                    <Delete />
                  </IconButton>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

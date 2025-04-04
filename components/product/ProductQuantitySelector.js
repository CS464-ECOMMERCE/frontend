"use client";
import { Add, Remove } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";

export default function ProductQuantitySelector({
  currentQuantity,
  maxQuantity,
  onQuantityChange,
}) {
  const increment = () => {
    const newQuantity = Math.min(currentQuantity + 1, maxQuantity);
    onQuantityChange(newQuantity);
  };

  const decrement = () => {
    const newQuantity = Math.max(currentQuantity - 1, 1);
    onQuantityChange(newQuantity);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "fit-content",
        gap: "1rem",
      }}
    >
      <IconButton onClick={decrement} disabled={currentQuantity <= 1}>
        <Remove />
      </IconButton>
      <Typography variant="body2">{currentQuantity}</Typography>
      <IconButton
        onClick={increment}
        disabled={!maxQuantity || currentQuantity >= maxQuantity}
      >
        <Add />
      </IconButton>
    </Paper>
  );
}

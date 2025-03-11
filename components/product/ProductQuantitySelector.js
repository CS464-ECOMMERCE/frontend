"use client";
import { Add, Remove } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";

export default function ProductQuantitySelector({
  currentQuantity,
  maxQuantity,
  onQuantityChange,
}) {
  const increment = () =>
    onQuantityChange((prev) => Math.min(prev + 1, maxQuantity));
  const decrement = () => onQuantityChange((prev) => Math.max(prev - 1, 1));

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
      <Typography variant="body2">{currentQuantity ?? 1}</Typography>
      <IconButton onClick={increment} disabled={currentQuantity >= maxQuantity}>
        <Add />
      </IconButton>
    </Paper>
  );
}

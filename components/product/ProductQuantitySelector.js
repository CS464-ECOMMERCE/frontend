import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

export default function ProductQuantitySelector({ maxQuantity }) {
  const [qty, setQty] = useState(1);
  const increment = () => setQty(() => qty + 1);
  const decrement = () => setQty(() => qty - 1);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-5">
        <Button variant="outlined" onClick={decrement} disabled={qty <= 1}>
          <Remove />
        </Button>
        <Typography variant="subtitle2">{qty}</Typography>
        <Button
          variant="outlined"
          onClick={increment}
          disabled={qty >= maxQuantity}
        >
          <Add />
        </Button>
      </div>
      <Button
        startIcon={<ShoppingCart />}
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: "white",
          "&:hover": { backgroundColor: "darkgray" },
        }}
      >
        Add to Cart
      </Button>
    </div>
  );
}

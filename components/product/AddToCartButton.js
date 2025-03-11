import { ShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function AddToCartButton({ id, quantity }) {
  return (
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
  );
}

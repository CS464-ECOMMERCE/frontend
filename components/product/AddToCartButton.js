import { ShoppingCart } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Typography } from "@mui/material";

export default function AddToCartButton({ id, quantity }) {
  return (
    <Button startIcon={<ShoppingCart />} variant="default">
      <Typography variant="body2">Add to Cart</Typography>
    </Button>
  );
}

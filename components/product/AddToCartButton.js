import { ShoppingCart } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Typography } from "@mui/material";
import { AddItemToCart } from "@/api/cart";

export default function AddToCartButton({ id, quantity }) {
  const handleAddToCart = async () => {
    await AddItemToCart(id, quantity);
  };

  return (
    <Button variant="default" onClick={handleAddToCart}>
      <ShoppingCart />
      <Typography variant="body2">Add to Cart</Typography>
    </Button>
  );
}

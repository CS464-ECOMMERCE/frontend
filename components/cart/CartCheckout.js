import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

export default function CartCheckout() {
  return (
    <Card elevation={4}>
      <CardHeader title="Order Summary" />
      <CardContent className="checkout-cart-content">
        <div className="item">
          <Typography variant="body2">Subtotal</Typography>
          <Typography variant="body2">$ 36.12</Typography>
        </div>
      </CardContent>
      <CardContent className="checkout-cart-content">
        <div className="item">
          <Typography variant="body2">Shipping</Typography>
          <Typography variant="body2">$ 5.00</Typography>
        </div>
      </CardContent>

      <Divider sx={{ width: "95%", margin: "0 auto" }} />

      <CardContent className="checkout-cart-content">
        <div className="item">
          <Typography variant="body1">Subtotal</Typography>
          <Typography variant="body1">$ 34.12</Typography>
        </div>
      </CardContent>

      <CardContent>
        <Button variant="contained" className="checkout-btn">
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  );
}

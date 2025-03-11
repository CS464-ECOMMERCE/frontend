import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";

export default function CartCheckout({ loading, items }) {
  let subtotal = 0
  if (!loading) {
    subtotal = Object.entries(items).reduce(
      (acc, [_, item]) => acc + item.price * item.quantity,
      0
    );
  }

  return (
    <>
      {loading ? (
        <Card elevation={4}>
          <CardHeader title={<Skeleton width="60%" />} />
          <CardContent className="checkout-cart-content">
            <div className="item">
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="20%" />
            </div>
          </CardContent>
          <CardContent className="checkout-cart-content">
            <div className="item">
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="20%" />
            </div>
          </CardContent>
          <Divider sx={{ width: "95%", margin: "0 auto" }} />
          <CardContent className="checkout-cart-content">
            <div className="item">
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="20%" />
            </div>
          </CardContent>
          <CardContent>
            <Skeleton variant="rectangular" width="100%" height={40} />
          </CardContent>
        </Card>
      ) : (
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
              <Typography variant="body1">$ {subtotal.toFixed(2)}</Typography>
            </div>
          </CardContent>

          <CardContent>
            <Button variant="contained" className="checkout-btn">
              Proceed to Checkout
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}

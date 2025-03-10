import { Add, Remove } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

export default function CartCard({ price, quantity, title }) {
  return (
    <Card className="cart-container" elevation={2}>
      <CardContent className="content">
        <CardMedia
          image="https://plus.unsplash.com/premium_photo-1741109190036-cbd11154bc65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D"
          className="img"
        />

        <div className="details">
          <div className="text">
            <Typography variant="body1">{title ?? "Title"}</Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Unit Price: {price ?? "$34.12"}
            </Typography>
          </div>
          <Paper variant="outlined" className="qty">
            <IconButton>
              <Remove />
            </IconButton>
            <Typography variant="body2">{quantity ?? 1}</Typography>
            <IconButton>
              <Add />
            </IconButton>
          </Paper>
        </div>

        <Typography variant="body1" className="total">
          Total: {price * quantity ?? "$34.12"}
        </Typography>
      </CardContent>
    </Card>
  );
}

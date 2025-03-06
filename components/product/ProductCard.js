"use client";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";
import ProductTag from "./ProductTag";

export default function ProductCard({ title, price, image }) {
  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card className="product-card" elevation={4}>
        <CardMedia
          className="img"
          image={
            image ??
            "https://images.unsplash.com/photo-1519337265831-281ec6cc8514"
          }
          title="Coffee"
        />
        <CardContent className="content">
          <Typography variant="h5">{title ?? "Title"}</Typography>
          <Divider />
          <div className="tag-container">
            <ProductTag />
          </div>
          <Typography variant="subtitle1">{price ?? "Price"}</Typography>
        </CardContent>
      </Card>
    </Grid2>
  );
}

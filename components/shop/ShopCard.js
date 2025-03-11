"use client";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid2,
  Skeleton,
  Typography,
} from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import ShopTag from "./ShopTag";

export default function ShopCard({
  id,
  title,
  price,
  image,
  onClick,
  isLoading,
}) {
  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      {isLoading ? (
        <Skeleton variant="rounded" className="shop-card" />
      ) : (
        <Card className="shop-card" onClick={() => onClick(id)}>
          <LazyLoadImage
            className="img"
            src={
              image ??
              "https://images.unsplash.com/photo-1519337265831-281ec6cc8514"
            }
            title="Coffee"
          />
          <CardContent className="content">
            <Typography variant="h5">{title ?? "Title"}</Typography>
            {/* <Divider /> */}
            {/* <div className="tag-container">
              <ShopTag />
            </div> */}
            <Typography variant="body2">{price ?? "Price"}</Typography>
          </CardContent>
        </Card>
      )}
    </Grid2>
  );
}

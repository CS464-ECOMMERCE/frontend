"use client";
import { Card, CardContent, Grid2, Skeleton, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ShopCard({
  id,
  title,
  price,
  image,
  onClick,
  isLoading,
}) {
  const getTitle = () => {
    if (!title) return "Title";
    return title.length > 10 ? title.slice(0, 10) + "..." : title;
  };
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
            <Typography variant="subtitle2">{getTitle()}</Typography>
            <Typography variant="body2">
              $ {price?.toFixed(2) ?? "Price"}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Grid2>
  );
}

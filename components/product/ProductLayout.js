"use client";
import { Grid2, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductLayout({ header }) {
  return (
    <div className="product-layout">
      <div className="header">
        <Typography variant="h3">{header ?? "Placeholder"}</Typography>
      </div>
      <Grid2 container spacing={3}>
        {Array.from({ length: 22 }).map((_, i) => (
          <ProductCard key={i} />
        ))}
      </Grid2>
    </div>
  );
}

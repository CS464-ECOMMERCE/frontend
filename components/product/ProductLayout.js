"use client";
import { Grid2, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";

export default function ProductLayout({ header }) {
  const router = useRouter();
  const handleOnClick = (id) => {
    router.push(`/product/${id}`);
  };
  return (
    <div className="product-layout">
      <div className="header">
        <Typography variant="h3">{header ?? "Placeholder"}</Typography>
      </div>
      <Grid2 container spacing={3}>
        {Array.from({ length: 22 }).map((_, i) => (
          <ProductCard key={i} id={i} onClick={handleOnClick} />
        ))}
      </Grid2>
    </div>
  );
}

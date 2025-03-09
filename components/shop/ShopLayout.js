"use client";
import { Grid2, Typography } from "@mui/material";
import ShopCard from "./ShopCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShopLayout({ header }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const handleOnClick = (id) => {
    router.push(`/shop/${id}`);
  };

  useEffect(() => {
    // fetch data
    console.log("fetch data here");
    setLoading(false);
  });

  return (
    <div className="">
      <div className="header">
        <Typography variant="h3">{header ?? "All Products"}</Typography>
      </div>
      {loading ? (
        <Grid2 container spacing={3}>
          {Array.from({ length: 20 }).map((_, i) => (
            <ShopCard key={i} isLoading={true} />
          ))}
        </Grid2>
      ) : (
        <Grid2 container spacing={3}>
          {Array.from({ length: 22 }).map((_, i) => (
            <ShopCard
              key={i}
              id={i}
              onClick={handleOnClick}
              isLoading={false}
            />
          ))}
        </Grid2>
      )}
    </div>
  );
}

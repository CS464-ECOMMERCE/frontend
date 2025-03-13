"use client";
import { Grid2, Typography } from "@mui/material";
import ShopCard from "./ShopCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetProducts } from "@/api/product";

const imagesPlaceholder = [
  "https://plus.unsplash.com/premium_photo-1741109190036-cbd11154bc65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1735342623457-b683e0ba1c2b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1736134869386-78142c34260f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
];

export default function ShopLayout({ header }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const router = useRouter();
  const handleOnClick = (id) => {
    router.push(`/shop/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetProducts();
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <div className="header">
        <Typography variant="h3">{header ?? "All Products"}</Typography>
      </div>
      {loading || data.length === 0 ? (
        <Grid2 container spacing={3}>
          {Array.from({ length: 20 }).map((_, i) => (
            <ShopCard key={i} isLoading={true} />
          ))}
        </Grid2>
      ) : (
        <Grid2 container spacing={3}>
          {data.map((item, i) => (
            <ShopCard
              key={i}
              id={item.id}
              title={item.name}
              price={item.price}
              image={imagesPlaceholder[i % 3]}
              onClick={handleOnClick}
              isLoading={false}
            />
          ))}
        </Grid2>
      )}
    </div>
  );
}

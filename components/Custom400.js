"use client";
import { Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function Custom400() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div>
      <Typography variant="h1">Something went wrong</Typography>
      <p>{message}</p>
    </div>
  );
}

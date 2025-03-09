"use client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { ArrowBack } from "@mui/icons-material";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      startIcon={<ArrowBack />}
      variant="outlined"
      onClick={() => router.back()}
    >
      Back
    </Button>
  );
}

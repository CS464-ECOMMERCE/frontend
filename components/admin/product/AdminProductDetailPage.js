"use client";
import { DownloadProductImages, GetProductById } from "@/src/app/api/product";
import BackButton from "@/components/BackButton";
import ProductImages from "@/components/product/gallery/ProductImages";
import ProductDetails from "@/components/product/ProductDetails";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductDialogForm } from "@/components/admin/product/ProductDialogForm";
import ProductDetailPage from "@/components/product/ProductDetailsPage";
import { Skeleton } from "@mui/material";

export default function AdminProductDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productId = searchParams.get("product_id");
    if (!productId) {
      router.push("/admin");
      return;
    }
    setProductId(productId);
    setLoading(false);
  }, []);

  if (loading) {
    return <Skeleton variant="rounded" width="100%" height="80vh" />;
  }

  return <ProductDetailPage isAdmin={true} productId={productId} />;
}

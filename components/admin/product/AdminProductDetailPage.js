"use client";
import { DownloadProductImages, GetProductById } from "@/src/app/api/product";
import BackButton from "@/components/BackButton";
import ProductImages from "@/components/product/gallery/ProductImages";
import ProductDetails from "@/components/product/ProductDetails";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductDialogForm } from "@/components/admin/product/ProductDialogForm";

export default function AdminProductDetailPage() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [formKey, setFormKey] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const productId = searchParams.get("product_id");
    if (!productId) {
      router.push("/admin");
      return;
    }
    const fetchData = async () => {
      const { status: dataStatus, data: product } = await GetProductById(
        productId
      );
      if (dataStatus !== 200) {
        router.push("/shop");
        return;
      }

      if (product.images?.length > 0) {
        const { status: imageStatus, data: images } =
          await DownloadProductImages(product.images);

        if (imageStatus === 200) {
          product["file_images"] = images;
        }
      }

      setData(product);
      setLoading(false);
    };
    fetchData();
  }, []);

  const updateData = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setFormKey((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <BackButton />
          <ProductDialogForm
            key={formKey}
            data={data}
            updateParentData={updateData}
            isNew={false}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <ProductImages images={data.images} loading={loading} />
          </div>
          <div className="flex-1">
            <ProductDetails item={data} loading={loading} isAdmin={true} />
          </div>
        </div>
      </div>
    </>
  );
}

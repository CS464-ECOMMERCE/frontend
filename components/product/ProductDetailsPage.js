"use client";
import { DownloadProductImages, GetProductById } from "@/src/app/api/product";
import BackButton from "@/components/BackButton";
import ProductImages from "@/components/product/gallery/ProductImages";
import ProductDetails from "@/components/product/ProductDetails";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductDialogForm } from "@/components/admin/product/ProductDialogForm";
import CustomSnackbar from "../CustomSnackbar";

export default function ProductDetailPage({ isAdmin = false, productId }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [formKey, setFormKey] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const router = useRouter();
  const fallbackRoute = isAdmin ? "/admin" : "/shop";

  const fetchData = async () => {
    const { status: dataStatus, data: product } =
      await GetProductById(productId);
    if (dataStatus !== 200) {
      router.push(fallbackRoute);
      return;
    }

    if (product.images?.length > 0) {
      const { status: imageStatus, data: images } = await DownloadProductImages(
        product.images,
      );

      if (imageStatus === 200) {
        product["file_images"] = images;
      }
    }

    setData(product);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetData = () => {
    setData({});
    setLoading(true);
    setFormKey((prev) => !prev);
  };

  const updateData = async (isSuccess, message) => {
    if (!isSuccess) {
      openSnackbar("error", message);
      return;
    }
    openSnackbar("success", message);
    resetData();
    await fetchData();
  };

  const openSnackbar = (severity, message) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div
          className={`flex ${isAdmin ? "justify-between" : "justify-start"}`}
        >
          <BackButton />
          {isAdmin && (
            <ProductDialogForm
              key={formKey}
              data={data}
              updateParentData={updateData}
              isNew={false}
            />
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <ProductImages images={data.images} loading={loading} />
          </div>
          <div className="flex-1">
            <ProductDetails item={data} loading={loading} isAdmin={isAdmin} />
          </div>
        </div>
      </div>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
      />
    </>
  );
}

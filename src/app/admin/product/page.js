"use client";
import { GetProductById } from "@/api/product";
import BackButton from "@/components/BackButton";
import ProductImages from "@/components/product/gallery/ProductImages";
import ProductDetails from "@/components/product/ProductDetails";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { imgPlaceholder } from "../../shop/[id]/page";
import { ProductDialogForm } from "@/components/admin/product/ProductDialogForm";

export default function Page() {
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
      const res = await GetProductById(productId);
      if (!res) {
        router.push("/shop");
        return;
      }
      setData(res);
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
      {loading ? (
        <div>Loading...</div>
      ) : (
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
              <ProductImages images={imgPlaceholder} loading={loading} />
            </div>
            <div className="flex-1">
              <ProductDetails item={data} loading={loading} isAdmin={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

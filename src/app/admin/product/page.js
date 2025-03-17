import AdminProductDetailPage from "@/components/admin/product/AdminProductDetailPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <AdminProductDetailPage />
    </Suspense>
  );
}

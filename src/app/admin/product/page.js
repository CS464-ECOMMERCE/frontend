"use client";
import { GetProductById } from "@/api/product";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const productId = searchParams.get("product_id");
    if (!productId) {
      router.push("/admin");
    }
    const fetchData = async () => {
      const res = await GetProductById(productId);
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  return <>{loading ? <div>Loading...</div> : <div>{data.id}</div>}</>;
}

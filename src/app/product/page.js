"use client";
import { Tab, Tabs } from "@mui/material";
import ProductLayout from "@/components/product/ProductLayout";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const placeholder = [
  {
    name: "All",
    query: "all",
  },
  {
    name: "Category 1",
    query: "category1",
  },
  {
    name: "Category 2",
    query: "category2",
  },
  {
    name: "Category 3",
    query: "category3",
  },
  {
    name: "Category 4",
    query: "category4",
  },
  {
    name: "Category 5",
    query: "category5",
  },
  {
    name: "Category 6",
    query: "category6",
  },
];

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const category = searchParams.get("category");
    const index = placeholder.findIndex((item) => item.query === category);
    if (index !== -1) {
      setValue(index);
    }
  }, [searchParams]);

  useEffect(() => {
    const categoryQuery = placeholder[value].query;
    if (categoryQuery === "all") {
      router.replace("/product");
      return;
    }
    router.push(`/product/?category=${categoryQuery}`);
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex">
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        className="flex min-w-fit"
      >
        {placeholder.map((item, i) => {
          return <Tab key={i} label={item.name}></Tab>;
        })}
      </Tabs>
      <ProductLayout header={placeholder[value].name} />
    </div>
  );
}

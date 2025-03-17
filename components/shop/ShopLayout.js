"use client";
import { Grid2, Typography, Pagination, Select, MenuItem } from "@mui/material";
import ShopCard from "./ShopCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetActiveProducts, GetActiveProductsPaginated } from "@/api/product";
import CustomPagination from "../CustomPagination";

const imagesPlaceholder = [
  "https://plus.unsplash.com/premium_photo-1741109190036-cbd11154bc65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1735342623457-b683e0ba1c2b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1736134869386-78142c34260f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
];

function GetPageNumber() {
  const { page } = useRouter().query;
  return page ? parseInt(page) : 1;
}

export default function ShopLayout({ header }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const router = useRouter();
  const handleOnClick = (id) => {
    router.push(`/shop/${id}`);
  };

  // data for pagination
  const [page, setPage] = useState(1);
  const itemPerPageValues = [20, 50, 100];
  const [itemPerPage, setItemPerPage] = useState(itemPerPageValues[0]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // reset page number when item per page changes
  useEffect(() => {
    setPage(1);
  }, [itemPerPage]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [allProducts, paginatedProducts] = await Promise.all([
        GetActiveProducts(),
        GetActiveProductsPaginated(page - 1, itemPerPage), // offset by 1 due to the label
      ]);
      setTotalItems(allProducts.length);
      setTotalPages(Math.ceil(allProducts.length / itemPerPage));
      setData(paginatedProducts);
      setLoading(false);
    };
    fetchData();
  }, [itemPerPage, page]);

  const updateItemPerPage = (newValue) => {
    setItemPerPage(newValue);
  };

  const updatePageNumber = (newValue) => {
    setPage(newValue);
  };

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
        <div className="flex flex-col items-center gap-8">
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
          <CustomPagination
            totalItems={totalItems}
            totalPages={totalPages}
            currentPage={page}
            currentPageSize={itemPerPage}
            onPageChange={updatePageNumber}
            itemPerPageValues={itemPerPageValues}
            onItemPerPageChange={updateItemPerPage}
          />
        </div>
      )}
    </div>
  );
}

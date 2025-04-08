"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GetMerchantProducts } from "@/src/app/api/product";
import { ProductDialogForm } from "./product/ProductDialogForm";
import DeleteProductBtn from "./DeleteProductBtn";
import CustomSnackbar from "../CustomSnackbar";

export default function AdminTable() {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = React.useState(0);
  const router = useRouter();
  const [cursor, setCursor] = React.useState(0);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      if (data[paginationModel.page]) {
        return;
      }

      setLoading(true);
      const lastCursor = paginationModel.page > 0 ? cursor : 0;
      const { status, data: res } = await GetMerchantProducts(
        paginationModel.pageSize,
        lastCursor,
      );

      if (status !== 200) {
        router.push("/oh_no");
        return;
      }
      setData((prev) => ({
        ...prev,
        [paginationModel.page]: { products: res.products },
      }));
      setRowCount(res.total);
      setCursor(res.cursor);
      setLoading(false);
    };
    fetchData();
  }, [paginationModel]);

  React.useEffect(() => {
    setData({});
    setCursor(0);
    setPaginationModel((prev) => ({ ...prev, page: 0 })); // reset page to 0 when page size changes
  }, [paginationModel.pageSize]);

  const handleEditClick = (params) => {
    const productId = params.row.id;
    router.push(`admin/product?product_id=${productId}`);
  };

  const deleteData = (isSuccess, deletedId) => {
    if (!isSuccess) {
      openSnackbar("error", "Failed to delete product.");
      return;
    }
    // remove data from the current page
    openSnackbar("success", "Successfully deleted product.");
    setData((prev) => {
      const newData = { ...prev };
      newData[paginationModel.page].products = newData[
        paginationModel.page
      ].products.filter((product) => product.id !== deletedId);
      return newData;
    });
  };

  const openSnackbar = (severity, message) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Product Name", flex: 2 },
    { field: "price", headerName: "Price", flex: 2 },
    {
      field: "inventory",
      headerName: "Inventory",
      flex: 2,
      valueGetter: (value) => value || 0,
    },
    {
      headerName: "",
      sortable: false,
      flex: 2,
      field: "view",
      renderCell: (params) => (
        <Button variant="default" onClick={() => handleEditClick(params)}>
          View Details
        </Button>
      ),
    },
    {
      headerName: "",
      sortable: false,
      flex: 2,
      field: "delete",
      renderCell: (params) => (
        <DeleteProductBtn
          product={params.row}
          description={
            <>
              Product ID: {params.row.id}
              <br />
              Product name: {params.row.name}
            </>
          }
          title="Are you sure you want to delete product?"
          updateParentData={deleteData}
        />
      ),
    },
  ];

  const addData = (newData) => {
    const lastKey = Object.keys(data).length - 1;

    // add new data to the (loaded) last page if it's not full
    // purpose is to reduce the number of API calls
    if (!data[lastKey]?.products) {
      // empty object
      setData((prev) => ({
        ...prev,
        [lastKey]: {
          products: [newData],
        },
      }));
    } else if (data[lastKey].products.length < paginationModel.pageSize) {
      setData((prev) => ({
        ...prev,
        [lastKey]: {
          ...prev[lastKey],
          products: [...prev[lastKey].products, newData],
        },
      }));
    }

    setRowCount((prev) => prev + 1);
  };

  return (
    <div>
      <div className="header justify-between items-center">
        <Typography variant="h4">Admin Page</Typography>
        <ProductDialogForm isNew={true} updateParentData={addData} />
      </div>
      <DataGrid
        rows={data[paginationModel.page]?.products || []}
        rowCount={rowCount}
        paginationMode="server"
        columns={columns}
        pageSizeOptions={[10, 20, 50]}
        rowSelection={false}
        getRowId={(row) => row.id}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationModelChange={(params) => {
          setPaginationModel(params);
        }}
        sx={{
          border: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
      />
    </div>
  );
}

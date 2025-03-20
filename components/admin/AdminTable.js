"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { Switch } from "../ui/switch";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GetProducts, GetProductsPaginated } from "@/src/app/api/product";
import { ProductDialogForm } from "./product/ProductDialogForm";

export default function AdminTable() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = React.useState(0);
  const [rowCountLoading, setRowCountLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const fetchData = async () => {
      setRowCountLoading(true);
      const products = await GetProducts();
      setRowCount(products.length);
      setRowCountLoading(false);
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const products = await GetProductsPaginated(
        paginationModel.page,
        paginationModel.pageSize
      );
      setData(products);
      setLoading(false);
    };
    fetchData();
  }, [paginationModel]);

  const handleSwitchChange = (params) => {
    const updatedData = data.map((row) => {
      if (row.id === params.row.id) {
        return { ...row, active: !row.active };
      }
      return row;
    });
    setData(updatedData);
  };

  const handleEditClick = (params) => {
    const productId = params.row.id;
    router.push(`admin/product?product_id=${productId}`);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Product Name", flex: 2 },
    { field: "price", headerName: "Price", flex: 2 },
    { field: "inventory", headerName: "Inventory", flex: 2 },
    {
      field: "active",
      headerName: "Active",
      sortable: false,
      flex: 2,
      renderCell: (params) => (
        <Switch
          disabled
          checked={params.row.active}
          onCheckedChange={() => handleSwitchChange(params)}
          color="primary"
        />
      ),
    },
    {
      headerName: "",
      sortable: false,
      flex: 2,
      field: "",
      renderCell: (params) => (
        <Button variant="default" onClick={() => handleEditClick(params)}>
          View Details
        </Button>
      ),
    },
  ];

  const addData = (newData) => {
    setData((prev) => [...prev, newData]);
    setRowCount((prev) => prev + 1);
  };

  return (
    <div>
      <div className="header justify-between items-center">
        <Typography variant="h4">Admin Page</Typography>
        <ProductDialogForm isNew={true} updateParentData={addData} />
      </div>
      <DataGrid
        rows={data}
        rowCount={rowCount}
        paginationMode="server"
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20, 50]}
        rowSelection={false}
        getRowId={(row) => row.id}
        loading={rowCountLoading || loading}
        onPaginationModelChange={(params) => {
          setPaginationModel(params);
        }}
        sx={{
          border: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

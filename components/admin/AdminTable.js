"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { Switch } from "../ui/switch";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GetProducts } from "@/api/product";
import { ProductDialogForm } from "./product/ProductDialogForm";

export default function AdminTable() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  const paginationModel = { page: 0, pageSize: 10 };

  React.useEffect(() => {
    const fetchData = async () => {
      const products = await GetProducts();
      setData(products);
      setLoading(false);
    };
    fetchData();
  }, []);

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

  return (
    <div>
      <div className="header justify-between items-center">
        <Typography variant="h4">Admin Page</Typography>
        <ProductDialogForm isNew={true} />
      </div>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20]}
        rowSelection={false}
        sx={{
          border: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

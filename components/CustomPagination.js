import { Pagination, Select, MenuItem, Typography } from "@mui/material";
import { useState } from "react";

export default function CustomPagination({
  totalItems,
  totalPages,
  currentPage,
  currentPageSize,
  onPageChange,
  itemPerPageValues,
  onItemPerPageChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-5 w-full text-gray-500">
      <div className="flex items-center">
        <Typography variant="body2">
          Showing{" "}
          {Math.min(totalItems, currentPageSize * (currentPage - 1) + 1)} -{" "}
          {Math.min(totalItems, currentPage * currentPageSize)} of {totalItems}{" "}
          items
        </Typography>
      </div>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, v) => onPageChange(v)}
      />

      <div className="flex items-center gap-5">
        <Typography variant="body2">Items per page:</Typography>
        <Select
          value={currentPageSize}
          onChange={(e) => onItemPerPageChange(e.target.value)}
          size="small"
          variant="outlined"
        >
          {itemPerPageValues.map((value, i) => (
            <MenuItem key={i} value={value}>
              <Typography variant="body2" className="text-gray-500">
                {value}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

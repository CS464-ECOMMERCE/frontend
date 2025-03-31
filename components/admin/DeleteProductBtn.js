"use client";
import { Delete } from "@mui/icons-material";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { DeleteProduct } from "@/src/app/api/product";

export default function DeleteProductBtn({
  product,
  description,
  title,
  updateParentData,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteProduct = async () => {
    if (loading) return;

    setLoading(true);
    const res = await DeleteProduct(product.id);
    if (res.status !== 200) {
      updateParentData(false, null);
      return;
    }
    updateParentData(true, product.id);
    setLoading(false);
  };

  const handleOpen = (e) => {
    if (!e && !loading) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(e) => handleOpen(e)}>
      <DialogTrigger asChild>
        <Button>
          <Delete />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-lg">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={() => deleteProduct()}
            disabled={loading}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

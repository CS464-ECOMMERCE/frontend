"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { UpdateOrderStatus } from "@/src/app/api/order";
import { OrderStatus } from "./status";

export default function CancelOrderBtn({ orderId, updateParentData }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const STATUS = OrderStatus.Cancelled;

  const cancelOrder = async () => {
    if (loading) return;

    setLoading(true);
    const res = await UpdateOrderStatus(orderId, STATUS);
    if (res.status !== 200) {
      updateParentData(false, null);
      return;
    }
    updateParentData(true, STATUS);
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
        <Button className="w-full sm:w-auto bg-red-700 hover:bg-red-400">
          Cancel
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Cancel Order</DialogTitle>
          <DialogDescription className="text-lg">
            Are you sure you want to cancel this order? This action is
            irrevesible.
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
            onClick={() => cancelOrder()}
            disabled={loading}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Delete } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";

export default function DeleteButton({ id }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => console.log("Delete", id)}>
          <Delete />
        </Button>
      </DialogTrigger>
      <DialogContent>Hello</DialogContent>
    </Dialog>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import CustomTextField from "../custominput/CustomTextField";
import { PlaceOrder } from "@/src/app/api/order";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "@/store/cartSlice";
import { Alert, Typography } from "@mui/material";

const fields = [
  {
    name: "email",
    label: "Email",
    placeholder: "johndoe@gmail.com",
    type: "text",
    validation: z.string().email("Please enter a valid email address."),
  },
];

const schema = z.object(
  fields.reduce((acc, field) => {
    acc[field.name] = field.validation;
    return acc;
  }, {})
);

export function CheckoutDialogForm() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const cartRedux = useSelector((state) => state.cart.items);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {
    setSubmitting(true);
    const { status, data } = await PlaceOrder(values.email);

    dispatch(fetchCart()); // update cart state

    if (status !== 200) {
      setError("Failed to place order. Please try again.");
      setSubmitting(false);
      return;
    }

    const newWindow = window.open(
      data.checkoutUrl,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;

    setSubmitting(false);
    closeDialog();
  };

  const openDialog = () => {
    if (cartRedux.length === 0) return;
    setError(null);
    setOpen(true);
  };

  const closeDialog = () => {
    if (submitting) return;
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => openDialog()}>
      <DialogTrigger asChild className="checkout-btn">
        <Button variant="default">Proceed to Checkout</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Checkout Information</DialogTitle>
          <DialogDescription className="text-md">
            Please enter your email for contact purposes.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field, i) => (
              <CustomTextField key={i} item={field} form={form} />
            ))}
            {error && (
              <DialogDescription>
                <Alert severity="error" className="flex items-center">
                  <Typography variant="body2" color="red">
                    {error}
                  </Typography>
                </Alert>
              </DialogDescription>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={closeDialog}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                Proceed
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

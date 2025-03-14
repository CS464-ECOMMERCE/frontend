"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Form } from "@/components/ui/form";
import CustomTextField from "@/components/custominput/CustomTextField";
import CustomSwitch from "@/components/custominput/CustomSwitch";

const fields = [
  {
    name: "name",
    label: "Product Name",
    placeholder: "Product Name",
    // disabled: true,
    type: "text",
    validation: z
      .string()
      .min(1, `Product Name must be at least 1 characters.`),
  },
  {
    name: "price",
    label: "Price",
    placeholder: "123.45",
    type: "number",
    validation: z
      .number()
      .min(0.01, "Product price must be more than 0.")
      .refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toString()), {
        message: "Price must have at most 2 decimal places",
      }),
  },
  {
    name: "quantity",
    label: "Quantity",
    placeholder: "456",
    type: "number",
    validation: z
      .number()
      .min(0, "Quantity must not be less than 0.")
      .refine((value) => /^\d+(\.\d{0})?$/.test(value.toString()), {
        message: "Quantity cannot have decimals",
      }),
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Tell us what you're thinking...",
    type: "text",
    validation: z.string().optional(),
  },
  {
    name: "stripe_price_id",
    label: "Stripe Price Id",
    value: "Hello",
    disabled: true,
    type: "text",
    validation: z.string().optional(),
  },
  {
    name: "active",
    label: "Active",
    type: "switch",
    validation: z.boolean().optional(),
  },
];

const schema = z.object(
  fields.reduce((acc, field) => {
    acc[field.name] = field.validation;
    return acc;
  }, {})
);

const defaultValues = fields.reduce((acc, field) => {
  if (field.value) {
    acc[field.name] = field.value;
    return acc;
  }
  acc[field.name] = field.type === "switch" ? false : "";
  return acc;
}, {});

export function EditProductDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  function onSubmit(values) {
    // You would typically send the form data to your server here
    console.log(values);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Edit Product</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[768px]">
        <DialogHeader>
          <DialogTitle>Edit Product Details</DialogTitle>
          <DialogDescription>
            Change how your products display on the page
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field, i) => (
              <div key={i}>
                {field.type === "text" || field.type === "number" ? (
                  <CustomTextField item={field} form={form} />
                ) : (
                  <CustomSwitch item={field} form={form} />
                )}
              </div>
            ))}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

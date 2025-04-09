"use client";

import { useEffect, useState } from "react";
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
import { Alert, Typography } from "@mui/material";
import {
  CreateProduct,
  UpdateProductById,
  UploadProductImage,
} from "@/src/app/api/product";
import CustomImageInput from "@/components/custominput/CustomImageInput";

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
    name: "inventory",
    label: "Inventory",
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
    disabled: true,
    placeholder: "Field is automatically generated",
    type: "text",
    validation: z.string().optional(),
  },
  {
    name: "file_images", // new key in frontend; not used in backend
    label: "Images",
    type: "file",
    validation: z.array(z.any()).optional().nullable(),
  },
];

const schema = z.object(
  fields.reduce((acc, field) => {
    acc[field.name] = field.validation;
    return acc;
  }, {}),
);

export function ProductDialogForm({ isNew, data, updateParentData }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const defaultValues = fields.reduce((acc, field) => {
    // set default values if not new
    if (!isNew && data[field.name]) {
      acc[field.name] = data[field.name];
    } else {
      acc[field.name] = field.type === "file" ? null : "";
    }
    return acc;
  }, {});

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (!isNew && data) {
      form.reset(data);
    }
  }, [data, isNew, form]);

  const { isDirty, dirtyFields } = form.formState;

  async function handleAddNewProductImage(productId, images) {
    if (!dirtyFields["file_images"]) {
      return;
    }

    const uploadImages = await UploadProductImage(productId, images);
    if (uploadImages.status !== 200) {
      setError("Failed to upload images");
      setSubmitting(false);
      return;
    }
  }

  async function onSubmit(values) {
    if (!isDirty) {
      closeDialog();
      return;
    }

    setSubmitting(true);

    let result;

    const valueWithoutImages = Object.fromEntries(
      Object.entries(values).filter(([key]) => key !== "file_images"),
    );

    if (isNew) {
      result = await CreateProduct(valueWithoutImages);
    } else {
      // only update dirty fields
      const updateData = Object.keys(dirtyFields).reduce(
        (acc, key) => {
          acc[key] = valueWithoutImages[key];
          return acc;
        },
        { id: data.id },
      );
      result = await UpdateProductById(updateData);
    }

    if (![200, 201].includes(result.status)) {
      updateParentData(false, `Failed to ${isNew ? "add" : "update"} product`);
      setError("Failed to update product");
      setSubmitting(false);
      return;
    }

    await handleAddNewProductImage(result.data.id, values.file_images);

    updateParentData(true, `Successfully ${isNew ? "added." : "updated."}`);
    setSubmitting(false);
    closeDialog();
  }

  function handleOnOpenChange(e) {
    if (!e) {
      closeDialog();
    } else {
      setOpen(true);
    }
  }

  function closeDialog() {
    if (submitting) return;
    setOpen(false);
    setError(null);
    form.reset();
  }

  function fieldType(field, form) {
    switch (field.type) {
      case "file":
        return (
          <CustomImageInput
            item={field}
            form={form}
            initialValue={defaultValues[`${field.name}`]}
          />
        );
      default: // text or number
        return <CustomTextField item={field} form={form} />;
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={(e) => handleOnOpenChange(e)}>
        <DialogTrigger asChild>
          <Button variant="default">
            {isNew ? "Create New" : "Edit"} Product
          </Button>
        </DialogTrigger>
        <DialogContent className="md:max-w-[768px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl">
              {isNew ? "Create New" : "Edit"} Product Details
            </DialogTitle>
            <DialogDescription className="text-lg">
              Change how your products display on the page
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {fields.map((field, i) => (
                <div key={i}>{fieldType(field, form)}</div>
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
                  {submitting ? "Submitting..." : isNew ? "Create" : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

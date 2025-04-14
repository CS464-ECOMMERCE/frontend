"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
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
import CustomCommandInput from "../custominput/CustomCommandInput";
import { autocompleteAddress } from "@/lib/google";
import CustomSelect from "../custominput/CustomSelect";
import { COUNTRY_OPTIONS } from "../util/Country";

const fields = [
  {
    name: "email",
    label: "Email",
    placeholder: "johndoe@gmail.com",
    type: "text",
    validation: z.string().email("Please enter a valid email address."),
  },
  {
    name: "country",
    label: "Country",
    placeholder: "Select your country",
    type: "select",
    validation: z.string().min(1, "Please select your country."),
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Enter your address",
    type: "command",
    validation: z.string().min(5, "Please enter a valid address."),
  },
];

const schema = z.object(
  fields.reduce((acc, field) => {
    acc[field.name] = field.validation;
    return acc;
  }, {}),
);

export function CheckoutDialogForm() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [isLoadingPredictions, setIsLoadingPredictions] = useState(false);
  const [addressQuery, setAddressQuery] = useState("");
  const dispatch = useDispatch();
  const cartRedux = useSelector((state) => state.cart.items);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      address: "",
      country: "",
    },
  });

  const watchCountry = form.watch("country");

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!addressQuery) {
        setPredictions([]);
        return;
      }

      setIsLoadingPredictions(true);
      const res = await autocompleteAddress(
        addressQuery,
        form.getValues("country"),
      );
      setPredictions(res.map((item) => ({ ...item, value: item.description })));
      setIsLoadingPredictions(false);
    };
    fetchPredictions();
  }, [addressQuery]);

  // Reset address field when country changes
  useEffect(() => {
    form.setValue("address", "");
    setAddressQuery("");
    setPredictions([]);
  }, [watchCountry, form]);

  // Debounce the address query input to reduce API calls
  const debouncedSetAddressQuery = useCallback(
    debounce((query) => {
      setAddressQuery(query);
    }, 500), // 500ms delay
    [],
  );

  // Update the address query with debounce
  const handleAddressChange = (query) => {
    debouncedSetAddressQuery(query);
  };

  const onSubmit = async (values) => {
    setSubmitting(true);
    const { status, data, error } = await PlaceOrder(
      values.email,
      values.address,
      values.country,
    );

    dispatch(fetchCart()); // update cart state

    if (status !== 200) {
      setError(error);
      setSubmitting(false);
      return;
    }

    window.location.href = data.checkoutUrl;

    setSubmitting(false);
    closeDialog();
  };

  const openDialog = (e) => {
    if (cartRedux.length === 0) return;

    if (!e && !submitting) {
      setOpen(false);
      form.reset();
    } else {
      setError(null);
      setOpen(true);
    }
  };

  const closeDialog = () => {
    if (submitting) return;
    form.reset();
    setOpen(false);
  };

  const renderInput = (field) => {
    switch (field.type) {
      case "text":
        return <CustomTextField key={field.name} item={field} form={form} />;
      case "select":
        return (
          <CustomSelect
            key={field.name}
            item={field}
            form={form}
            options={COUNTRY_OPTIONS}
          />
        );
      case "command":
        return (
          <CustomCommandInput
            key={field.name}
            item={field}
            form={form}
            options={predictions}
            isLoading={isLoadingPredictions}
            onTextChange={handleAddressChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(e) => openDialog(e)}>
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
            {fields.map((field) => renderInput(field))}

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

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

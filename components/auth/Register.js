"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomTextField from "@/components/custominput/CustomTextField";
import { Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/src/app/api/auth/auth";
import CustomSnackbar from "../CustomSnackbar";

const fields = [
  {
    name: "email",
    label: "Email",
    placeholder: "Email",
    type: "email",
    validation: z.string().email("Invalid email address"),
  },
  {
    name: "confirm_email",
    label: "Confirm Email",
    placeholder: "Retype Email",
    type: "email",
    validation: z.string().email("Invalid email address"),
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Password",
    type: "password",
    validation: z.string().min(6, "Email must be at least 6 characters"),
  },
  {
    name: "business_name",
    label: "Business Name",
    placeholder: "Monkey Business",
    type: "text",
    validation: z.string().min(1, "Email must be at least 1 characters"),
  },
  {
    name: "tax_id",
    label: "Tax Id",
    placeholder: "tax_123456",
    type: "text",
    validation: z.string().min(1, "Email must be at least 1 characters"),
  },
];

const schema = z
  .object(
    fields.reduce((acc, field) => {
      acc[field.name] = field.validation;
      return acc;
    }, {}),
  )
  .refine((data) => data.email === data.confirm_email, {
    message: "Emails do not match",
    path: ["confirm_email"],
  });

export default function Register() {
  const [loading, setLoading] = useState(false);
  const defaultValues = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: "" }),
    {},
  );
  const router = useRouter();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values) {
    setLoading(true);
    const { email, password, business_name, tax_id } = values;
    const res = await registerUser(email, password, business_name, tax_id);

    if (res.status === 200) {
      showSnackbar(true, "Registration successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
        setLoading(false);
      }, 3000);
    } else {
      showSnackbar(false, res.error);
      setLoading(false);
    }
  }

  const showSnackbar = (success, message) => {
    setSnackbar({
      open: true,
      message: message,
      severity: success ? "success" : "error",
    });
  };

  return (
    <div>
      <Card className="w-full mx-0 sm:w-[70%] sm:mx-auto">
        <CardContent className="flex flex-col gap-5 justify-center">
          <Typography variant="h5" className="text-center">
            Register merchant account
          </Typography>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {fields.map((field, index) => (
                <CustomTextField key={index} item={field} form={form} />
              ))}
              <Button type="submit" disabled={loading}>
                Register
              </Button>
            </form>
          </Form>

          <p variant="body2">
            Already have a merchant account?{" "}
            <a href="/login" className="text-blue-500 underline">
              Login
            </a>
          </p>

          <p variant="body2">
            Looking to shop? Shop and checkout anonymously!{" "}
            <a href="/shop" className="text-blue-500 underline">
              Shop now
            </a>
          </p>
        </CardContent>
      </Card>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
}

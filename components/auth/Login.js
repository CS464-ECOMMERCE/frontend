"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomTextField from "@/components/custominput/CustomTextField";
import { Card, CardContent } from "@mui/material";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
    name: "password",
    label: "Password",
    placeholder: "Password",
    type: "password",
    validation: z.string().min(1, "Email must be at least 1 characters"),
  },
];

const schema = z.object(
  fields.reduce((acc, field) => {
    acc[field.name] = field.validation;
    return acc;
  }, {}),
);

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "Login failed. Something went wrong!",
    severity: "error",
  });
  const defaultValues = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: "" }),
    {},
  );
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values) {
    setLoading(true);
    const { email, password } = values;
    const res = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/admin",
      email,
      password,
    });
    if (res.status === 200) {
      router.push("/admin");
    } else if (res.status === 401) {
      showError("Invalid email or password");
    } else {
      showError("Login failed. Something went wrong!");
    }
    setLoading(false);
  }

  const showError = (message) => {
    setSnackbar({ ...snackbar, open: true, message });
  };

  return (
    <div>
      <Card className="w-full mx-0 sm:w-[70%] sm:mx-auto">
        <CardContent className="flex flex-col gap-5 justify-center">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {fields.map((field, index) => (
                <CustomTextField key={index} item={field} form={form} />
              ))}
              <Button type="submit" disabled={loading}>
                Sign in
              </Button>
            </form>
          </Form>

          <p variant="body2">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 underline">
              Sign up
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

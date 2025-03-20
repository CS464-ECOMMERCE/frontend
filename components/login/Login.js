"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomTextField from "@/components/custominput/CustomTextField";
import { Card, CardContent } from "@mui/material";
import { useState } from "react";
import { LoginWithEmailPassword } from "@/api/auth";

const fields = [
  {
    name: "email",
    label: "Email",
    placeholder: "Email",
    type: "email",
    value: "test@test.com",
    validation: z.string().email("Invalid email address"),
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Password",
    type: "password",
    value: "testing",
    validation: z.string().min(1, "Email must be at least 1 characters"),
  },
];

const schema = z.object(
  fields.reduce((acc, field) => {
    acc[field.name] = field.validation;
    return acc;
  }, {})
);

export default function Login() {
  const [loading, setLoading] = useState(false);
  const defaultValues = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: field.value }),
    {}
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values) {
    setLoading(true);
    const { email, password } = values;
    const response = await LoginWithEmailPassword(email, password);
    setLoading(false);
  }

  return (
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
  );
}

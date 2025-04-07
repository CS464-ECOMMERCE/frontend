"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import CustomTextField from "@/components/custominput/CustomTextField";

export default function InputCardForm() {
  const [inputType, setInputType] = useState("id");

  const getFields = () => {
    if (inputType === "id") {
      return [
        {
          name: "identifier",
          label: "ID Number",
          placeholder: "Enter your Order ID number",
          type: "text",
          validation: z
            .string()
            .min(1, "ID is required")
            .regex(/^\d+$/, "ID must contain only numbers"),
        },
      ];
    } else {
      return [
        {
          name: "identifier",
          label: "Email Address",
          placeholder: "Enter your email address",
          type: "email",
          validation: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email address"),
        },
      ];
    }
  };

  const fields = getFields();
  const schema = z.object(
    fields.reduce((acc, field) => {
      acc[field.name] = field.validation;
      return acc;
    }, {}),
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      identifier: "",
    },
  });

  useEffect(() => {
    form.reset({ identifier: "" });
  }, [inputType, form]);

  const onSubmit = (values) => {
    alert(`Submitted ${inputType}: ${values.identifier}`);
  };

  const handleInputTypeChange = (value) => {
    setInputType(value);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Purchase Order Status</CardTitle>
        <CardDescription className="text-md">
          Please provide your Order ID or email address to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={inputType}
          onValueChange={handleInputTypeChange}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="id" id="id" />
            <Label htmlFor="id">Order ID Number</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email" />
            <Label htmlFor="email">Email Address</Label>
          </div>
        </RadioGroup>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field, index) => (
              <CustomTextField key={index} item={field} form={form} />
            ))}
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

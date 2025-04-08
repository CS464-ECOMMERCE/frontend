"use client";

import { useState } from "react";
import { Check, Clock, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LazyLoadImage } from "react-lazy-load-image-component";

const OrderStatus = {
  Pending: "pending",
  Processing: "processing",
  Completed: "completed",
};

export default function OrderDetails({ order }) {
  const {
    id,
    order_items: items,
    status,
    created_at,
    updated_at,
  } = order || {};
  const [activeTab, setActiveTab] = useState("status");

  const orderDate = new Date(created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const estimatedDelivery = () => {
    const date = new Date(created_at);
    date.setDate(date.getDate() + 2);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const deliveredDate = new Date(updated_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusSteps = [
    {
      id: "pending",
      label: "Order Placed",
      icon: Clock,
      date: orderDate,
    },
    {
      id: "processing",
      label: status === OrderStatus.Processing ? "Processing" : "Processed",
      icon: Package,
      date: status === OrderStatus.Processing ? "" : orderDate,
    },
    {
      id: "completed",
      label: "Delivered",
      icon: Check,
      date: status === OrderStatus.Completed ? deliveredDate : "",
    },
  ];

  const getStatusIndex = (currentStatus) => {
    return statusSteps.findIndex((step) => step.id === currentStatus);
  };

  const currentStatusIndex = getStatusIndex(status);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-2xl">
              Order #{id ?? "Order Id"}
            </CardTitle>
            <CardDescription className="text-xl">
              Placed on {orderDate}
            </CardDescription>{" "}
          </div>
          <Button variant="outline">Need Help?</Button>
        </div>
      </CardHeader>
      <Tabs
        defaultValue="status"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="status">Order Status</TabsTrigger>
            <TabsTrigger value="details">Order Details</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="status" className="pt-4 pb-6">
          <CardContent>
            <div className="space-y-8">
              {/* Status Progress Bar */}
              <div className="relative">
                <div className="absolute top-5 left-0 right-0 h-1 bg-muted">
                  <div
                    className="absolute h-1 bg-primary transition-all duration-500 ease-in-out"
                    style={{
                      width: `${currentStatusIndex === 0 ? 0 : (currentStatusIndex / (statusSteps.length - 1)) * 100}%`,
                    }}
                  />
                </div>
                <div className="relative flex justify-between">
                  {statusSteps.map((step, index) => {
                    const StepIcon = step.icon;
                    const isCompleted = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;

                    return (
                      <div key={step.id} className="flex flex-col items-center">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center z-10",
                            isCompleted
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground",
                            isCurrent ? "ring-4 ring-primary/20" : "",
                          )}
                        >
                          <StepIcon className="h-5 w-5" />
                        </div>
                        <div className="mt-2 text-center">
                          <p
                            className={cn(
                              "text-md text-md",
                              isCompleted
                                ? "text-primary"
                                : "text-muted-foreground",
                            )}
                          >
                            {step.label}
                          </p>
                          {step.date && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {step.date}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Details */}
              <div className="bg-muted/40 rounded-lg p-4">
                <p className="text-md mb-2">Shipping Information</p>
                {status === OrderStatus.Pending && (
                  <p className="text-md text-muted-foreground">
                    Your order has been placed and is being prepared for
                    processing.
                  </p>
                )}
                {status === OrderStatus.Processing && (
                  <div className="text-md text-muted-foreground">
                    Your order is being processed and will be shipped soon.
                    <br />
                    Estimated delivery: {estimatedDelivery()}
                  </div>
                )}
                {status === OrderStatus.Completed && (
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                      <p className="text-md">
                        Tracking Number:{" "}
                        <span className="text-md font-bold">
                          some-random-tracking-number
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </TabsContent>

        {/* Order Details */}
        <TabsContent value="details">
          <CardContent className="pt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-md mb-3">Items in Your Order</h3>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <LazyLoadImage
                          src={
                            item.product_image ||
                            "https://images.unsplash.com/photo-1519337265831-281ec6cc8514"
                          }
                          alt={item.product_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-md">{item.product_name}</h4>
                        <p className="text-md text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-md mt-1">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-md mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-md">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>
                      $
                      {items
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0,
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-md">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Coming soon</span>
                  </div>
                  <div className="flex justify-between text-md">
                    <span className="text-muted-foreground">Tax</span>
                    <span>Coming soon</span>
                  </div>
                  <div className="flex justify-between text-md pt-2 border-t mt-2">
                    <span>Total</span>
                    <span>
                      $
                      {items
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0,
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
      <CardFooter className="flex flex-col sm:flex-row gap-3 border-t pt-6">
        {activeTab === "status" ? (
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => setActiveTab("details")}
          >
            View Order Details
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => setActiveTab("status")}
          >
            View Order Status
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

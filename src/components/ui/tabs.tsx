"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const tabVariants = cva("data-[state=active]:text-neutral-950 hover:cursor-pointer px-3", {
  variants: {
    variant: {
      horizontal:
        "inline-flex whitespace-nowrap text-sm font-medium data-[state=active]:border-b-4 w-2/5 data-[state=active]:border-blue-600 relative py-1.5",
      vertical:
        "flex flex-col justify-center items-center data-[state=active]:border-b-0 text-xs !text-[#f0f0f0] rounded-lg !flex-wrap !text-center data-[state=active]:!bg-primary-400 mx-1 py-3",
    },
  },
  defaultVariants: {
    variant: "horizontal",
  },
});

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center p-1 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 w-full",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabVariants> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabVariants({ variant, className }), "w-full justify-center")}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-neutral-950 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

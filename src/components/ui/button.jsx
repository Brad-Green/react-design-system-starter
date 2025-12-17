import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-surface-action text-content-on-action border border-border-action hover:bg-primary-600 hover:border-primary-600 disabled:bg-surface-disabled disabled:border-border-disabled disabled:text-content-disabled",
        destructive:
          "bg-error text-white border border-error hover:bg-error-600 disabled:bg-surface-disabled disabled:border-border-disabled disabled:text-content-disabled",
        outline:
          "border border-border-action bg-surface-base text-content-action hover:text-primary-600 hover:border-primary-600 disabled:bg-surface-base disabled:border-border-disabled disabled:text-content-disabled",
        secondary:
          "bg-secondary text-white border border-secondary hover:bg-secondary-600 disabled:bg-surface-disabled disabled:border-border-disabled disabled:text-content-disabled",
        ghost: 
          "text-content-action hover:text-primary-600 hover:bg-surface-1 disabled:text-content-disabled",
        transparent:
          "text-content-action hover:text-primary-600 disabled:text-content-disabled",
        link: 
          "text-content-action underline-offset-4 hover:underline hover:text-primary-600 disabled:text-content-disabled",
      },
      size: {
        default: "h-9 px-3 py-2 text-xl leading-6 [&_svg]:size-6", // 20px text, 24px line-height, 12px padding, 8px vertical
        sm: "h-8 rounded-md px-3 text-base leading-5 [&_svg]:size-4",
        lg: "h-10 rounded-md px-8 text-xl leading-6 [&_svg]:size-6",
        icon: "h-9 w-9 [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }

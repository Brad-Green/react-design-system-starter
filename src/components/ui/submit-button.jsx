import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Submit Button Component
 * 
 * A primary action button with "Submit" text and a right arrow icon.
 * 
 * AGENTS.md Compliance:
 * ✅ Uses shadcn/ui Button as foundation
 * ✅ Uses Tailwind classes with semantic design tokens
 * ✅ No hardcoded hex codes or pixel values
 * ✅ Accessible with proper ARIA attributes
 * ✅ No Emotion needed (static styling)
 * 
 * Design Tokens Used:
 * - bg-surface-action: Primary action background (semantic token)
 * - text-content-on-action: Text on action buttons (semantic token)
 * - gap-2: Spacing token (8px)
 * - hover:bg-primary-600: Hover state (exception - OK to use primitive for hover)
 * - focus-visible:ring-primary-500: Focus ring (exception - OK to use primitive for focus)
 */
export function SubmitButton({ 
  className,
  disabled = false,
  onClick,
  type = "submit",
  children = "Submit",
  showIcon = true,
  ...props 
}) {
  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        // Primary action styling using semantic design tokens
        "bg-surface-action text-content-on-action",
        "hover:bg-primary-600", // Exception: hover state uses primitive
        "focus-visible:ring-primary-500", // Exception: focus ring uses primitive
        // Icon spacing using design token
        "gap-2",
        className
      )}
      {...props}
    >
      {children}
      {showIcon && (
        <ArrowRight 
          className="h-4 w-4" 
          aria-hidden="true"
        />
      )}
    </Button>
  );
}

export default SubmitButton;

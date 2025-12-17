/**
 * Component Template - AGENTS.md Compliant
 * 
 * This template shows the correct pattern for creating new components
 * that follow AGENTS.md rules (100% design token compliance).
 * 
 * Copy this template and replace:
 * - ComponentName with your component name
 * - Add your component props
 * - Implement your component logic
 * - Remove this comment block
 */

import React from 'react';
import { cn } from '@/lib/utils';
// Import shadcn/ui components as needed
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';

/**
 * ComponentName Component
 * 
 * Brief description of what this component does.
 * 
 * AGENTS.md Compliance:
 * ✅ Uses design tokens (no hardcoded values)
 * ✅ Uses Tailwind for structure
 * ✅ Uses shadcn/ui components as foundation
 * ✅ Accessible (proper HTML semantics, ARIA if needed)
 * ✅ Theme-aware (automatic light/dark support)
 * 
 * Design Tokens Used:
 * - bg-surface-base: Card/panel background
 * - text-content-primary: Primary text color
 * - p-4, gap-2: Spacing tokens
 * - rounded-md: Border radius token
 * - border-neutral-300: Border color token
 */
export function ComponentName({
  className,
  children,
  // Add your props here
  ...props
}) {
  return (
    <div
      className={cn(
        // Layout and structure using Tailwind + design tokens
        "flex flex-col gap-4",
        // Background using design token
        "bg-surface-base",
        // Padding using spacing token (p-4 = 16px)
        "p-4",
        // Border using design tokens
        "border border-neutral-300",
        // Border radius using design token
        "rounded-md",
        // Text colors using design tokens
        "text-content-primary",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default ComponentName;

/**
 * USAGE EXAMPLES:
 * 
 * // Basic usage
 * <ComponentName>
 *   Content here
 * </ComponentName>
 * 
 * // With custom className
 * <ComponentName className="w-full max-w-md">
 *   Content here
 * </ComponentName>
 * 
 * // In a form context
 * <form className="space-y-4">
 *   <ComponentName>
 *     Form content
 *   </ComponentName>
 * </form>
 */

/**
 * DESIGN TOKEN REFERENCE:
 * 
 * Colors:
 * - bg-primary-500, bg-primary-600 (brand colors)
 * - bg-surface-base, bg-surface-background (surfaces)
 * - text-content-primary, text-content-subtle, text-content-muted (text)
 * - border-neutral-300, border-neutral-200 (borders)
 * 
 * Spacing:
 * - p-1 (4px), p-2 (8px), p-3 (12px), p-4 (16px), p-6 (24px)
 * - gap-1, gap-2, gap-4, gap-6 (same values)
 * - m-1, m-2, m-4, m-6 (margins)
 * 
 * Border Radius:
 * - rounded-sm (2px), rounded-md (4px), rounded-lg (8px), rounded-xl (12px)
 * 
 * NEVER USE:
 * ❌ Hex codes: #3b82f6, #ffffff
 * ❌ Pixel values: 16px, p-[16px], m-[24px]
 * ❌ Arbitrary values: bg-[#3b82f6], p-[16px]
 */


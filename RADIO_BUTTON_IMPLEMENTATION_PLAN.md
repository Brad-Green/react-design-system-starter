# Radio Button Implementation Plan

## Overview

This plan shows how to build a Radio Button component that:
- ✅ Uses shadcn/ui as foundation
- ✅ Matches your Figma design system exactly
- ✅ Uses design tokens exclusively
- ✅ Maintains compatibility with shadcn/ui patterns
- ✅ Integrates with Code Connect

---

## Architecture Decision

### The Right "Direction"

```
┌─────────────────────────────────────────────────┐
│  Your Radio Component                            │
│  - Matches Figma design                          │
│  - Uses your design tokens                       │
│  - Provides convenient API                      │
└─────────────────────────────────────────────────┘
              ↓ uses
┌─────────────────────────────────────────────────┐
│  shadcn/ui RadioGroupItem                        │
│  - Radix UI primitive (accessibility)            │
│  - Customizable via className                    │
│  - Maintains shadcn/ui API                       │
└─────────────────────────────────────────────────┘
              ↓ styled with
┌─────────────────────────────────────────────────┐
│  Your Design Tokens                              │
│  - Colors from Figma                             │
│  - Spacing from design system                    │
│  - Theme-aware (light/dark)                      │
└─────────────────────────────────────────────────┘
```

**Key Principle**: You're **customizing** shadcn/ui, not replacing it.

---

## Step-by-Step Implementation

### Phase 1: Preparation (5 minutes)

#### Step 1.1: Check Figma Design

1. Open Figma Desktop App
2. Navigate to your Radio Button component
3. Note these design specs:
   - Radio circle size (width/height)
   - Border color (unchecked state)
   - Fill color (checked state)
   - Label text styling
   - Spacing between radio and label
   - Focus ring style
   - Disabled state appearance

#### Step 1.2: Extract Design Values

Use Figma MCP to get exact values:

```
Get design context for Radio Button component: [Figma URL]
Get variable definitions for Radio Button: [Figma URL]
```

**What to extract**:
- Checked color (e.g., `#6d3ba9` or token name)
- Unchecked border color
- Label text color
- Spacing values
- Size values

#### Step 1.3: Map to Design Tokens

Create a mapping table:

| Figma Value | Current Token | Action Needed |
|------------|---------------|---------------|
| Checked color | `surface-action` (#6d3ba9) | ✅ Use existing |
| Border color | `border-default` | ✅ Use existing |
| Label color | `content-primary` | ✅ Use existing |
| Gap (radio-label) | `spacing-3` (12px) | ✅ Use existing |
| Radio size | Check if matches token | May need custom |

**If token doesn't exist**: Add to `tokens/fdb-design-tokens.json` and rebuild.

---

### Phase 2: Install shadcn/ui Component (2 minutes)

#### Step 2.1: Install Radio Group

```bash
npx shadcn@latest add radio-group
```

**This creates**:
- `src/components/ui/radio-group.jsx`
- Contains: `RadioGroup` (container) and `RadioGroupItem` (radio button)

#### Step 2.2: Review Generated Component

Read `src/components/ui/radio-group.jsx` to understand:
- Structure
- Default styling
- Props API
- Radix UI integration

---

### Phase 3: Customize to Match Figma (15 minutes)

#### Step 3.1: Analyze Default shadcn/ui Styling

**Default RadioGroupItem** (from shadcn/ui):
```jsx
// Default uses generic colors
className="aspect-square h-4 w-4 rounded-full border border-primary text-primary"
```

**Your Figma Design** likely needs:
- Specific border color (not `border-primary`)
- Specific checked color (your `surface-action`)
- Specific size (may not be `h-4 w-4`)
- Specific focus ring style

#### Step 3.2: Customize RadioGroupItem

**File**: `src/components/ui/radio-group.jsx`

**Replace default styling with design tokens**:

```jsx
import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("grid gap-3", className)} // gap-3 = 12px from design tokens
    {...props}
  />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // Base size - adjust to match Figma (h-4 w-4 = 16px, or h-5 w-5 = 20px)
        "aspect-square h-4 w-4 rounded-full",
        
        // Border - use design token
        "border border-neutral-300", // Unchecked state
        
        // Text color for checked indicator
        "text-surface-action", // This becomes the fill color when checked
        
        // Focus ring - use design token
        "ring-offset-background focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        
        // Disabled state - use design tokens
        "disabled:cursor-not-allowed disabled:opacity-50",
        "disabled:border-neutral-300", // Use border-disabled token if available
        
        // Checked state - use design tokens
        "data-[state=checked]:border-surface-action",
        "data-[state=checked]:bg-surface-action",
        
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
```

**Key Customizations**:
- ✅ `border-neutral-300` instead of `border-primary`
- ✅ `text-surface-action` for checked color
- ✅ `focus-visible:ring-primary-500` for focus ring
- ✅ `gap-3` (12px) for spacing
- ✅ All values use design tokens

#### Step 3.3: Create Radio Wrapper Component (Optional)

**If your Figma design has Radio + Label as a single unit**, create a wrapper:

**File**: `src/components/ui/radio.jsx`

```jsx
import * as React from "react"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

/**
 * Radio Component
 * 
 * A radio button with integrated label, matching Figma design.
 * Built on shadcn/ui RadioGroupItem foundation.
 * 
 * AGENTS.md Compliance:
 * ✅ Uses shadcn/ui components as foundation
 * ✅ Uses design tokens for all styling
 * ✅ No hardcoded values
 * ✅ Accessible with proper ARIA
 */
const Radio = React.forwardRef(({ 
  id,
  label,
  value,
  disabled = false,
  className,
  labelClassName,
  ...props 
}, ref) => {
  const radioId = id || React.useId() || `radio-${value}`
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <RadioGroupItem
        ref={ref}
        id={radioId}
        value={value}
        disabled={disabled}
        {...props}
      />
      {label && (
        <Label
          htmlFor={radioId}
          className={cn(
            "text-base leading-5 text-content-primary",
            "cursor-pointer font-normal", // Adjust to match Figma
            disabled && "text-content-disabled cursor-not-allowed",
            labelClassName
          )}
        >
          {label}
        </Label>
      )}
    </div>
  )
})
Radio.displayName = "Radio"

export { Radio }
```

**Why a wrapper?**
- Provides convenient API: `<Radio value="1" label="Option 1" />`
- Matches Figma component structure (radio + label together)
- Still uses shadcn/ui underneath
- Maintains accessibility

---

### Phase 4: Verify Design Token Usage (5 minutes)

#### Step 4.1: Check for Hardcoded Values

**Search for**:
- Hex codes: `#...`
- Pixel values: `16px`, `p-[16px]`
- Arbitrary values: `bg-[#...]`

**If found**: Replace with design tokens

#### Step 4.2: Verify Token Mapping

**Check each style**:
- Colors → `bg-*`, `text-*`, `border-*` using tokens
- Spacing → `p-*`, `m-*`, `gap-*` using tokens
- Size → `h-*`, `w-*` using tokens

#### Step 4.3: Test Theme Switching

1. Run `npm run dev`
2. Toggle theme (light/dark)
3. Verify Radio adapts correctly
4. Check all states (checked, unchecked, disabled, focus)

---

### Phase 5: Create Storybook Stories (10 minutes)

**File**: `src/components/ui/radio.stories.jsx`

```jsx
import { Radio } from "@/components/ui/radio"
import { RadioGroup } from "@/components/ui/radio-group"

export default {
  title: "Components/Radio",
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export const Default = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  ),
}

export const WithDefaultValue = {
  render: () => (
    <RadioGroup defaultValue="option2">
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  ),
}

export const Disabled = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" disabled />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  ),
}

export const InForm = {
  render: () => (
    <form className="space-y-4">
      <RadioGroup name="preference" defaultValue="email">
        <Radio value="email" label="Email notifications" />
        <Radio value="sms" label="SMS notifications" />
        <Radio value="push" label="Push notifications" />
      </RadioGroup>
    </form>
  ),
}

export const ThemeComparison = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-4 text-content-primary">Light Theme</h3>
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      </div>
      <div data-theme="dark" className="p-4 rounded-lg bg-surface-base">
        <h3 className="text-sm font-semibold mb-4 text-content-primary">Dark Theme</h3>
        <RadioGroup defaultValue="option1">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      </div>
    </div>
  ),
}
```

---

### Phase 6: Add Code Connect (10 minutes)

#### Step 6.1: Get Figma Node ID

1. Open Figma Desktop App
2. Select your Radio Button component (definition, not instance)
3. Right-click → Copy link
4. Extract node ID from URL

#### Step 6.2: Create Code Connect File

**File**: `src/components/ui/radio.figma.jsx`

```jsx
import figma from "@figma/code-connect";
import { Radio } from "./radio";
import { RadioGroup } from "./radio-group";

figma.connect(
  Radio,
  "https://www.figma.com/design/XIDqnN4PNwZqsOd2cG0Avq/Design-System?node-id=RADIO_NODE_ID",
  {
    props: {
      label: figma.string("Label"), // Or figma.children("Label") if it's a layer
      value: figma.string("value"),
      disabled: figma.boolean("Disabled"),
    },
    example: (props) => (
      <RadioGroup>
        <Radio
          value={props.value}
          label={props.label}
          disabled={props.disabled}
        />
      </RadioGroup>
    ),
  }
);
```

#### Step 6.3: Publish to Figma

```bash
npx figma connect parse    # Validate
npx figma connect publish # Publish
```

---

### Phase 7: Verification (5 minutes)

#### Step 7.1: AGENTS.md Compliance Check

- [ ] No hex codes
- [ ] No pixel values
- [ ] No arbitrary values
- [ ] All colors use tokens
- [ ] All spacing uses tokens
- [ ] Built on shadcn/ui
- [ ] Accessible
- [ ] Theme-aware

#### Step 7.2: Visual Verification

1. Compare with Figma design
2. Check all states (checked, unchecked, disabled, focus, hover)
3. Verify spacing matches
4. Verify colors match
5. Test in light/dark theme

#### Step 7.3: Functional Testing

1. Radio selection works
2. Keyboard navigation works
3. Disabled state works
4. Form integration works
5. Accessibility (screen reader)

---

## Design Token Customization Examples

### Example 1: Radio Size Doesn't Match Token

**Problem**: Figma radio is 20px, but tokens only have 16px (h-4) or 24px (h-6)

**Solution A**: Use closest token
```jsx
// Use h-5 (20px) if it exists in your spacing scale
className="h-5 w-5"
```

**Solution B**: Add custom size token
```json
// tokens/fdb-design-tokens.json
{
  "size": {
    "radio": { "value": "20px" }
  }
}
```
Then rebuild and use: `h-[var(--size-radio)]`

**Solution C**: Use arbitrary value (last resort, document why)
```jsx
// Document: Radio size from Figma design system (20px)
className="h-5 w-5" // 20px = spacing-5
```

### Example 2: Border Color Doesn't Match

**Problem**: Figma uses `#e4e4e4` but `border-neutral-200` is different

**Solution**: Check if token exists or add it
```json
// If border-default token exists, use it
className="border border-default"

// Or add specific token
{
  "color": {
    "border": {
      "radio": { "value": "#e4e4e4" }
    }
  }
}
```

### Example 3: Focus Ring Style Different

**Problem**: Figma has specific focus ring (2px, specific color)

**Solution**: Customize focus ring with tokens
```jsx
className={cn(
  "focus-visible:ring-2", // 2px ring
  "focus-visible:ring-primary-500", // Use your action color
  "focus-visible:ring-offset-2" // Offset
)}
```

---

## Common Patterns for Other Components

### Dropdown/Select

1. Install: `npx shadcn@latest add select`
2. Customize `SelectTrigger` with design tokens
3. Customize `SelectContent` (dropdown menu)
4. Match Figma colors, spacing, typography

### Checkbox

1. Install: `npx shadcn@latest add checkbox`
2. Customize `Checkbox` with design tokens
3. Create wrapper if needed (Checkbox + Label)
4. Match Figma checked/unchecked states

### Switch/Toggle

1. Install: `npx shadcn@latest add switch`
2. Customize `Switch` with design tokens
3. Match Figma on/off colors
4. Match Figma thumb size and position

---

## Key Principles Summary

### ✅ DO:

1. **Start with shadcn/ui**: Always check if component exists
2. **Customize with tokens**: Replace default colors/spacing with your tokens
3. **Maintain API**: Keep shadcn/ui props/API when possible
4. **Use wrappers**: Create convenience wrappers for Figma patterns
5. **Document decisions**: Comment why you customized something

### ❌ DON'T:

1. **Don't modify shadcn/ui source directly**: Customize via className
2. **Don't hardcode values**: Always use design tokens
3. **Don't break accessibility**: Keep Radix UI primitives
4. **Don't create completely new API**: Extend shadcn/ui API
5. **Don't skip Code Connect**: Always add for developer reference

---

## Success Criteria

Your Radio component is complete when:

- ✅ Matches Figma design exactly
- ✅ Uses design tokens exclusively
- ✅ Built on shadcn/ui foundation
- ✅ Accessible (keyboard, screen reader)
- ✅ Theme-aware (light/dark)
- ✅ Documented in Storybook
- ✅ Connected to Figma (Code Connect)
- ✅ AGENTS.md compliant (100%)

---

## Next Component: Dropdown

After Radio, follow the same pattern for Dropdown:

1. Install: `npx shadcn@latest add select`
2. Get Figma design specs
3. Customize with design tokens
4. Create Storybook stories
5. Add Code Connect
6. Verify compliance

---

## Questions to Ask Yourself

Before building each component:

1. **Does shadcn/ui have this?** → Install it
2. **What's different from Figma?** → Customize with tokens
3. **Do I need a wrapper?** → If Figma has specific pattern
4. **Are all tokens available?** → Add missing ones
5. **Does it match Figma?** → Visual comparison
6. **Is it accessible?** → Test keyboard/screen reader
7. **Does theme switching work?** → Test light/dark

---

## You're Ready!

This plan gives you the **right direction**:
- ✅ shadcn/ui provides structure
- ✅ Your tokens provide styling
- ✅ Figma provides design
- ✅ Code Connect provides docs

**Start with Radio Button** and follow this exact pattern for all future components! 🚀


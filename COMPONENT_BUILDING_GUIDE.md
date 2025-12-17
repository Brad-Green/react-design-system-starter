# Component Building Guide: shadcn/ui + Figma Design System Integration

## Architecture Philosophy

### The Three-Layer Approach

Your component architecture follows a **three-layer approach** that ensures consistency, maintainability, and design system alignment:

```
┌─────────────────────────────────────────┐
│  Layer 3: Your Custom Components        │
│  (Radio, Dropdown, etc.)                 │
│  - Built on shadcn/ui foundation         │
│  - Styled with your design tokens        │
│  - Matches Figma design system          │
└─────────────────────────────────────────┘
              ↓ extends
┌─────────────────────────────────────────┐
│  Layer 2: shadcn/ui Components          │
│  (Button, Input, Card, etc.)             │
│  - Radix UI primitives                   │
│  - Accessible by default                 │
│  - Customizable via className           │
└─────────────────────────────────────────┘
              ↓ uses
┌─────────────────────────────────────────┐
│  Layer 1: Design Tokens                  │
│  (Your Figma Design System)              │
│  - Colors, spacing, typography           │
│  - Semantic tokens (surface-action)     │
│  - Theme-aware (light/dark)              │
└─────────────────────────────────────────┘
```

### Key Principles

1. **shadcn/ui as Foundation**: Always start with shadcn/ui components when available
2. **Design Tokens First**: All styling must reference design tokens (never hardcode)
3. **Figma as Source of Truth**: Figma design system defines the visual design
4. **Customization via Tokens**: Customize shadcn/ui components using your design tokens
5. **Code Connect for Documentation**: Connect components to Figma for developer reference

---

## Component Building Workflow

### Step-by-Step Process

```
1. Identify Component in Figma
   ↓
2. Check if shadcn/ui has equivalent
   ↓
3. Install shadcn/ui component (if available)
   ↓
4. Extract design specs from Figma (MCP)
   ↓
5. Customize shadcn/ui to match Figma
   ↓
6. Use design tokens for all styling
   ↓
7. Create Storybook stories
   ↓
8. Add Code Connect mapping
   ↓
9. Verify AGENTS.md compliance
```

---

## Detailed Example: Building a Radio Button Component

### Step 1: Check shadcn/ui Availability

**shadcn/ui has a Radio Group component** that uses Radix UI primitives.

**Command to install**:
```bash
npx shadcn@latest add radio-group
```

This will create:
- `src/components/ui/radio-group.jsx` - The Radio Group component

### Step 2: Analyze Your Figma Radio Button Design

**Using Figma MCP**, get the design context:

1. Open Figma Desktop App
2. Select your Radio Button component
3. Copy the Figma URL (with node-id)
4. In Cursor, use:
   ```
   Get the design context for this Figma component: [paste URL]
   ```

**What to extract from Figma**:
- Colors (checked, unchecked, hover, focus, disabled states)
- Spacing (gap between radio and label, padding)
- Typography (label font size, weight, line height)
- Size (radio circle size)
- Border radius (if radio has rounded corners)
- Focus ring style

### Step 3: Map Figma Design to Design Tokens

**Map Figma values to your design token system**:

| Figma Value | Design Token | Usage |
|------------|--------------|-------|
| Radio checked color | `surface-action` or `primary-500` | Radio indicator |
| Radio border color | `border-default` or `border-action` | Radio border |
| Label text color | `content-primary` | Label text |
| Spacing between radio/label | `spacing-2` or `spacing-3` | Gap |
| Radio size | Custom or spacing token | Width/height |
| Focus ring color | `primary-500` or `ring` | Focus state |

**If token doesn't exist**, add it to `tokens/fdb-design-tokens.json`:
```json
{
  "color": {
    "radio": {
      "checked": { "value": "{color.surface.action}" },
      "unchecked": { "value": "{color.border.default}" },
      "disabled": { "value": "{color.border.disabled}" }
    }
  }
}
```

Then rebuild: `npm run tokens:build`

### Step 4: Install shadcn/ui Radio Group

```bash
npx shadcn@latest add radio-group
```

This creates `src/components/ui/radio-group.jsx` with:
- `RadioGroup` - Container component
- `RadioGroupItem` - Individual radio button
- `Label` - Already exists, can be reused

### Step 5: Customize to Match Figma Design

**File**: `src/components/ui/radio-group.jsx`

**Approach**: Customize the shadcn/ui component using your design tokens:

```jsx
import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

// Customize RadioGroupItem to match Figma design
const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // Base styles using design tokens
        "aspect-square h-4 w-4 rounded-full border border-neutral-300",
        "text-surface-action", // Checked color from design tokens
        "ring-offset-background focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Use semantic tokens for states
        "data-[state=checked]:border-surface-action data-[state=checked]:bg-surface-action",
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

// RadioGroup container (usually doesn't need customization)
const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

export { RadioGroup, RadioGroupItem }
```

**Key Points**:
- ✅ Uses design tokens (`border-neutral-300`, `surface-action`, `primary-500`)
- ✅ No hardcoded values
- ✅ Extends shadcn/ui structure
- ✅ Maintains Radix UI accessibility
- ✅ Customizable via `className` prop

### Step 6: Create a Radio Component Wrapper (Optional)

**If your Figma design has a specific Radio + Label pattern**, create a wrapper:

**File**: `src/components/ui/radio.jsx`

```jsx
import * as React from "react"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

/**
 * Radio Component
 * 
 * A radio button with label, matching your Figma design system.
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
  const radioId = id || `radio-${value}`
  
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
            "cursor-pointer",
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

### Step 7: Create Storybook Stories

**File**: `src/components/ui/radio.stories.jsx`

```jsx
import { Radio } from "@/components/ui/radio"
import { RadioGroup } from "@/components/ui/radio-group"

export default {
  title: "Components/Radio",
  component: Radio,
  tags: ['autodocs'],
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

export const Disabled = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" disabled />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  ),
}

export const WithForm = {
  render: () => (
    <form>
      <RadioGroup name="preference" defaultValue="email">
        <Radio value="email" label="Email" />
        <Radio value="sms" label="SMS" />
        <Radio value="push" label="Push Notifications" />
      </RadioGroup>
    </form>
  ),
}
```

### Step 8: Add Code Connect Mapping

**File**: `src/components/ui/radio.figma.jsx`

```jsx
import figma from "@figma/code-connect";
import { Radio } from "./radio";
import { RadioGroup } from "./radio-group";

// Connect to your Figma Radio component
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

### Step 9: Verify AGENTS.md Compliance

**Checklist**:
- [ ] No hardcoded hex codes (`#...`)
- [ ] No hardcoded pixel values (`16px`, `p-[16px]`)
- [ ] No arbitrary values (`bg-[#...]`)
- [ ] All colors use tokens (`bg-primary-500`, `text-content-primary`)
- [ ] All spacing uses tokens (`gap-3`, `p-4`)
- [ ] Built on shadcn/ui foundation
- [ ] Accessible (proper ARIA, keyboard navigation)
- [ ] Theme-aware (works in light/dark mode)

---

## Decision Framework: When to Customize vs. Create New

### Use shadcn/ui Component When:
- ✅ Component exists in shadcn/ui (Button, Input, Card, Radio Group, etc.)
- ✅ Figma design is similar to shadcn/ui default
- ✅ You just need to customize colors/spacing to match Figma
- ✅ Accessibility is important (Radix UI handles this)

### Create Custom Component When:
- ❌ Component doesn't exist in shadcn/ui
- ❌ Figma design is significantly different from shadcn/ui
- ❌ You need complex custom behavior not in shadcn/ui
- ⚠️ **BUT**: Still use design tokens and follow AGENTS.md rules

### Hybrid Approach (Recommended):
- Use shadcn/ui as foundation
- Customize styling with design tokens
- Add wrapper components for Figma-specific patterns
- Maintain shadcn/ui's accessibility features

---

## Common Component Patterns

### Pattern 1: Direct shadcn/ui Usage (Button, Input)

**When**: Figma design closely matches shadcn/ui default

**Example**: Your `Input` component
- Installed from shadcn/ui
- Customized with design tokens (`border-neutral-200`, `bg-surface-1`)
- No wrapper needed

### Pattern 2: shadcn/ui + Wrapper (SubmitButton)

**When**: Figma has specific variant/pattern

**Example**: Your `SubmitButton`
- Built on shadcn/ui `Button`
- Adds specific styling (`bg-primary-500`, icon)
- Wrapper provides Figma-specific API

### Pattern 3: shadcn/ui + Custom Styling (Radio)

**When**: Need to match Figma exactly but keep shadcn/ui structure

**Example**: Radio component
- Uses shadcn/ui `RadioGroupItem`
- Customized with design tokens
- Wrapper adds Label integration

### Pattern 4: Custom Component (Dialog/Modal)

**When**: Complex component not in shadcn/ui

**Example**: Dialog/Modal components
- Custom component structure
- Uses shadcn/ui primitives (Button, Input, Label)
- All styling uses design tokens

---

## Design Token Mapping Strategy

### For Each Component, Map:

1. **Colors**:
   - Default state → `surface-*`, `content-*`, `border-*`
   - Hover state → `hover:` variants or semantic tokens
   - Focus state → `ring-*` or `primary-*`
   - Disabled state → `disabled:` or `border-disabled`, `content-disabled`
   - Active/Selected → `surface-action`, `content-action`

2. **Spacing**:
   - Padding → `p-*` (p-2, p-4, p-6)
   - Margin → `m-*` or `gap-*`
   - Size → `h-*`, `w-*` (use spacing scale)

3. **Typography**:
   - Font size → `text-*` (text-sm, text-base, text-lg)
   - Font weight → `font-*` (font-normal, font-semibold)
   - Line height → Usually included in text-* classes

4. **Borders**:
   - Border width → `border`, `border-thin`, `border-medium`
   - Border radius → `rounded-*` (rounded-sm, rounded-md, rounded-lg)
   - Border color → `border-*` (border-neutral-200, border-action)

---

## Dropdown/Select Component Example

### Step 1: Install shadcn/ui Select

```bash
npx shadcn@latest add select
```

### Step 2: Get Figma Design Specs

Extract from Figma:
- Dropdown height
- Padding
- Border style
- Text color
- Icon color/size
- Focus state
- Disabled state

### Step 3: Customize with Design Tokens

```jsx
// src/components/ui/select.jsx (after shadcn install)
// Customize the SelectTrigger to match Figma

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      // Use your design tokens
      "flex h-9 w-full items-center justify-between rounded-md border border-neutral-200",
      "bg-surface-1 px-3 py-2 text-base leading-5 text-content-primary",
      "ring-offset-background placeholder:text-content-muted",
      "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
```

---

## Best Practices

### 1. Always Start with shadcn/ui

**Check availability first**:
```bash
# See all available components
npx shadcn@latest add

# Install specific component
npx shadcn@latest add [component-name]
```

**Available components**:
- `button`, `input`, `label`, `card`
- `radio-group`, `checkbox`, `select`, `switch`
- `dropdown-menu`, `popover`, `dialog`, `sheet`
- `tabs`, `accordion`, `alert`, `toast`
- And many more...

### 2. Customize via Design Tokens

**Don't override shadcn/ui structure**, customize styling:

```jsx
// ✅ GOOD: Customize with tokens
<Button className="bg-surface-action text-content-on-action" />

// ❌ BAD: Override with hardcoded values
<Button className="bg-[#6d3ba9] text-white" />
```

### 3. Maintain shadcn/ui API

**Keep the same props/API** when possible:

```jsx
// ✅ GOOD: Maintains shadcn/ui API
<RadioGroup value={value} onValueChange={onChange}>
  <Radio value="1" label="Option 1" />
</RadioGroup>

// ❌ BAD: Completely different API
<CustomRadio value="1" text="Option 1" />
```

### 4. Use Semantic Tokens

**Prefer semantic over primitive**:

```jsx
// ✅ GOOD: Semantic tokens
className="bg-surface-action text-content-on-action border-border-action"

// ⚠️ ACCEPTABLE: Primitive tokens (if semantic doesn't exist)
className="bg-primary-500 text-white border-primary-500"
```

### 5. Add Missing Tokens to Design System

**If Figma has a value not in tokens**, add it:

1. Add to `tokens/fdb-design-tokens.json`
2. Run `npm run tokens:build`
3. Use in component

---

## Component Checklist

For every new component:

- [ ] Checked if shadcn/ui has equivalent
- [ ] Installed shadcn/ui component (if available)
- [ ] Extracted Figma design specs (MCP)
- [ ] Mapped Figma values to design tokens
- [ ] Added missing tokens (if needed)
- [ ] Customized shadcn/ui with design tokens
- [ ] Created wrapper component (if needed)
- [ ] Created Storybook stories
- [ ] Added Code Connect mapping
- [ ] Verified AGENTS.md compliance
- [ ] Tested in light/dark theme
- [ ] Verified accessibility

---

## Example: Complete Radio Button Implementation

See the detailed Radio button example above for a complete walkthrough.

---

## Troubleshooting

### "shadcn/ui component doesn't match Figma"

**Solution**: Customize with design tokens while keeping structure:
- Keep Radix UI primitives (accessibility)
- Replace colors with your tokens
- Adjust spacing with your tokens
- Add wrapper for Figma-specific patterns

### "Design token doesn't exist"

**Solution**: Add it to your token system:
1. Add to `tokens/fdb-design-tokens.json`
2. Rebuild: `npm run tokens:build`
3. Use in component

### "Component conflicts with shadcn/ui"

**Solution**: Use composition:
- Keep shadcn/ui component as-is
- Create wrapper that uses it
- Customize via `className` prop
- Don't modify shadcn/ui source files directly

---

## Next Steps

1. **Start with Radio Button**: Follow the detailed example above
2. **Then Dropdown**: Use Select component from shadcn/ui
3. **Then Checkbox**: Use Checkbox from shadcn/ui
4. **Build systematically**: One component at a time
5. **Document as you go**: Storybook + Code Connect

---

## Key Takeaway

**The "Right Direction"**:
1. ✅ shadcn/ui provides structure and accessibility
2. ✅ Your design tokens provide styling
3. ✅ Figma provides the visual design
4. ✅ Code Connect provides developer documentation

**You're not replacing shadcn/ui** - you're **customizing it** with your design system while maintaining its benefits (accessibility, structure, API consistency).


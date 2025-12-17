# AI Agent Governance Rules

## Project Overview

This React project uses a **hybrid styling approach** combining:
- **Tailwind CSS + shadcn/ui** for component structure and layout
- **Emotion** for dynamic styling that requires JavaScript
- **Style Dictionary** for design token management
- **Figma Code Connect** for design-to-code integration (✅ in place)

## Core Styling Principles

### ✅ Required: Use Design Tokens

**All styling MUST reference the design system tokens.** Never hardcode values.

### 🎯 Prefer Semantic/Mapped Tokens

**Always prefer semantic/mapped tokens over primitive tokens.**

Semantic tokens describe **purpose** (what it's for), not appearance (what color it is).

#### ✅ Use Semantic Tokens (PREFERRED)
```jsx
// Describe purpose, not appearance
<div className="bg-surface-action text-content-on-action">
<button className="bg-error text-white">
<p className="text-content-subtle">
<div className="border border-default">
```

#### ❌ Avoid Primitive Tokens
```jsx
// Don't use raw color values
<div className="bg-primary-500 text-white">
<button className="bg-error-500">
<p className="text-neutral-600">
<div className="border border-neutral-200">
```

**See `TOKEN_MAPPING_REFERENCE.md` for complete mapping guide.**

#### ❌ PROHIBITED - Hardcoded Values
```jsx
// NEVER do this:
<div className="bg-[#3b82f6] p-[16px] rounded-[8px]">
<div style={{ color: '#6b7280', marginTop: '24px' }}>
<StyledDiv css={{ backgroundColor: '#ef4444', padding: '20px' }}>
```

#### ✅ REQUIRED - Token-Based Styling
```jsx
// Use Tailwind classes that reference tokens:
<div className="bg-primary-500 p-4 rounded-md">

// Or use CSS variables directly:
<div style={{ color: 'var(--content-primary)', marginTop: 'var(--spacing-6)' }}>

// Or use Emotion with theme object:
<StyledDiv css={(theme) => ({ 
  backgroundColor: theme.colorBrandPrimary500,
  padding: theme.spacing4 
})}>
```

## Styling Decision Matrix

### When to Use Tailwind CSS

**Use Tailwind for:**
- Static layouts and positioning
- Responsive design breakpoints
- Component structure and spacing
- Standard color/border/shadow applications
- Any styling that doesn't require dynamic JavaScript values

**Example:**
```jsx
import { Button } from '@/components/ui/button';

function MyComponent() {
  return (
    <div className="flex flex-col gap-4 p-6 bg-surface-base rounded-lg">
      <h2 className="text-xl font-semibold text-content-primary">Title</h2>
      <p className="text-sm text-content-subtle">Description text</p>
      <Button variant="default" size="lg">Click Me</Button>
    </div>
  );
}
```

### When to Use Emotion

**Use Emotion for:**
- Dynamic styling based on JavaScript state/props
- Complex computed styles
- Animations requiring JavaScript control
- Theme-dependent logic beyond simple color swapping

**Example:**
```jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTheme } from '@emotion/react';

function DynamicComponent({ progress, isActive }) {
  const theme = useTheme();
  
  return (
    <div
      css={css`
        background-color: ${isActive ? theme.colorBrandPrimary500 : theme.colorNeutral200};
        width: ${progress}%;
        padding: ${theme.spacing3}px;
        border-radius: ${theme.borderRadiusMd}px;
        transition: all 0.3s ease;
      `}
    >
      Progress: {progress}%
    </div>
  );
}
```

## Design Token System

### Available Token Categories

#### Colors

**⚠️ IMPORTANT: Prefer semantic tokens over primitives!**

```javascript
// ✅ SEMANTIC TOKENS (PREFERRED - Use These)
--color-surface-action            // Action buttons, CTAs
--color-surface-base              // Card/panel base
--color-surface-1/2/3             // Elevated surfaces
--color-content-primary           // Primary text
--color-content-subtle             // Secondary text
--color-content-muted              // Tertiary text
--color-content-action            // Action text, links
--color-content-on-action         // Text on action buttons
--color-border-default            // Default borders
--color-border-action             // Action borders
--color-border-disabled           // Disabled borders
--color-signal-error              // Error states (semantic)
--color-signal-success            // Success states (semantic)
--color-signal-warning            // Warning states (semantic)
--color-signal-info               // Info states (semantic)

// ⚠️ PRIMITIVE TOKENS (Internal Use Only - Avoid in Components)
--color-brand-primary-{50-900}     // Primary brand colors (use surface-action instead)
--color-brand-secondary-{50-900}   // Secondary brand colors
--color-neutral-{50-950}           // Grayscale palette (use semantic tokens instead)

// ✅ EXCEPTIONS (OK to Use Primitives)
// - Hover states: hover:bg-primary-600 (when semantic doesn't have hover variant)
// - Focus rings: ring-primary-500 (standard focus color)
// - Color demos: Showing color scales themselves
```

#### Spacing
```javascript
--spacing-0   // 0px
--spacing-1   // 4px
--spacing-2   // 8px
--spacing-3   // 12px
--spacing-4   // 16px
--spacing-5   // 20px
--spacing-6   // 24px
--spacing-8   // 32px
--spacing-10  // 40px
--spacing-12  // 48px
--spacing-16  // 64px
--spacing-20  // 80px
--spacing-24  // 96px
```

#### Border Radius
```javascript
--border-radius-none  // 0px
--border-radius-sm    // 2px
--border-radius-md    // 4px
--border-radius-lg    // 8px
--border-radius-xl    // 12px
```

#### Border Width
```javascript
--border-width-none    // 0px
--border-width-thin    // 1px
--border-width-medium  // 2px
--border-width-thick   // 4px
```

### Tailwind Token Mapping

The Tailwind configuration maps design tokens to utility classes:

```jsx
// Colors
<div className="bg-primary-500 text-content-primary border-neutral-300">

// Spacing
<div className="p-4 m-6 gap-3">

// Border Radius
<div className="rounded-md">  // Maps to --border-radius-md

// Border Width
<div className="border-medium">  // Maps to --border-width-medium
```

### Emotion Theme Object

When using Emotion, access tokens via the theme object:

```jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTheme } from '@emotion/react';

function ThemedComponent() {
  const theme = useTheme();
  
  return (
    <div
      css={css`
        color: ${theme.colorContentPrimary};
        padding: ${theme.spacing4}px;
        background: ${theme.colorBrandPrimary500};
        border-radius: ${theme.borderRadiusMd}px;
      `}
    >
      Content
    </div>
  );
}
```

## Component Guidelines

### Using shadcn/ui Components

**Always use shadcn/ui components as the foundation:**

```jsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function MyFeature() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Title</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-content-subtle">Description text</p>
        <Button variant="default">Action</Button>
      </CardContent>
    </Card>
  );
}
```

### Creating New Components

When creating new components:

1. **Start with shadcn/ui** if a matching component exists
2. **Use Tailwind classes** for layout and basic styling
3. **Add Emotion** only if dynamic styling is required
4. **Always reference tokens**, never hardcode values

**Example - New Component:**
```jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@/components/ui/button';

function ProgressCard({ title, progress, isComplete }) {
  return (
    <div 
      className="p-6 rounded-lg border border-neutral-200 bg-surface-base"
      css={css`
        opacity: ${isComplete ? 0.6 : 1};
        transition: opacity 0.3s ease;
      `}
    >
      <h3 className="text-lg font-semibold text-content-primary mb-4">
        {title}
      </h3>
      
      <div 
        className="h-2 bg-neutral-100 rounded-full overflow-hidden"
        css={css`
          .progress-bar {
            width: ${progress}%;
            transition: width 0.5s ease;
          }
        `}
      >
        <div className="progress-bar h-full bg-primary-500" />
      </div>
      
      <Button 
        variant={isComplete ? "outline" : "default"}
        className="mt-4"
      >
        {isComplete ? 'Review' : 'Continue'}
      </Button>
    </div>
  );
}
```

## Theme Switching

The project supports light and dark themes via the `data-theme` attribute.

### Implementation
```jsx
// Theme is controlled via data attribute on root element
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-theme', 'light');
```

### CSS Variables Automatically Update
```css
/* Light theme (default) */
:root {
  --color-surface-background: #ffffff;
  --color-content-primary: #000000;
}

/* Dark theme */
[data-theme="dark"] {
  --color-surface-background: #1a1a1a;
  --color-content-primary: #ffffff;
}
```

### No Manual Theme Handling Required
When using tokens, theme switching is automatic. DO NOT write theme-specific code unless absolutely necessary.

```jsx
// ✅ CORRECT - Automatic theme switching
<div className="bg-surface-background text-content-primary">
  This automatically adjusts for light/dark theme
</div>

// ❌ WRONG - Manual theme handling
<div className={isDark ? "bg-gray-900 text-white" : "bg-white text-black"}>
  Don't do this!
</div>
```

## Code Quality Standards

### Accessibility
- Use semantic HTML elements
- Include proper ARIA labels when needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios (use design tokens for compliant colors)

### Performance
- Minimize CSS-in-JS runtime overhead (prefer Tailwind for static styles)
- Use Emotion only when dynamic styling is necessary
- Leverage component memoization when appropriate
- Avoid unnecessary re-renders

### Maintainability
- Keep components small and focused
- Use descriptive variable/function names
- Document complex styling logic
- Follow consistent file structure

## File Structure

```
src/
├── components/
│   └── ui/              # shadcn/ui components
│       ├── button.jsx
│       ├── card.jsx
│       └── *.figma.jsx  # Figma Code Connect mappings
├── lib/
│   └── utils.js         # Utility functions (cn helper)
├── theme/               # Emotion theme config
│   └── emotionTheme.js
└── main.jsx             # App entry point
```

## Build and Token Management

### Regenerating Design Tokens

When design tokens are updated in Figma or manually edited:

```bash
# Rebuild tokens from source JSON files
npm run tokens:build

# This generates:
# - build/css/variables.css (light theme CSS variables)
# - build/css/variables-dark.css (dark theme CSS variables)
# - build/js/theme-light.js (light theme JS exports for Emotion)
# - build/js/theme-dark.js (dark theme JS exports for Emotion)
```

### DO NOT Modify Generated Files

Never edit files in the `build/` directory directly. Always update the source token files:
- `tokens/fdb-design-tokens.json` (light theme)
- `tokens/fdb-design-tokens-dark.json` (dark theme)

## Common Patterns

### Conditional Styling
```jsx
// ✅ CORRECT - Using Tailwind with conditional classes
<Button 
  className={cn(
    "w-full",
    isLoading && "opacity-50 cursor-not-allowed"
  )}
  disabled={isLoading}
>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>

// ✅ CORRECT - Using Emotion for complex dynamic styles
<div
  css={css`
    background: ${status === 'error' ? theme.colorSignalError500 : theme.colorBrandPrimary500};
    transform: scale(${isHovered ? 1.05 : 1});
    transition: transform 0.2s ease;
  `}
>
```

### Responsive Design
```jsx
// Use Tailwind's responsive utilities
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <Card key={item.id} className="p-4 md:p-6">
      {/* Content */}
    </Card>
  ))}
</div>
```

### Form Components
```jsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function LoginForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="Enter your email"
          className="w-full"
        />
      </div>
      
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
}
```

## Troubleshooting

### Tokens Not Updating
1. Check if `npm run tokens:build` was run after token changes
2. Verify import paths in `src/main.jsx` or `src/index.css`
3. Clear browser cache and restart dev server
4. Check browser DevTools for CSS variable values

### Tailwind Classes Not Working
1. Ensure class names exist in `tailwind.config.js` theme extension
2. Check if PostCSS is processing Tailwind directives
3. Verify `content` paths in `tailwind.config.js` include your files
4. Restart dev server after config changes

### Emotion Styles Not Applying
1. Verify `/** @jsxImportSource @emotion/react */` pragma is at top of file
2. Check if ThemeProvider wraps the component tree
3. Ensure theme object structure matches token exports
4. Verify Emotion packages are installed (`@emotion/react`, `@emotion/styled`)

## Figma Integration (Future)

Once Figma Code Connect is configured:

### Syncing Components
```bash
# Publish Code Connect mappings to Figma
npx figma connect publish

# Verify in Figma Dev Mode
# Components should show code examples in the "Code" panel
```

### Updating Mappings
When Figma components change:
1. Update the corresponding `*.figma.jsx` file
2. Adjust variant mappings to match Figma properties
3. Re-publish with `npx figma connect publish`
4. Verify in Figma Dev Mode

## Summary: The Three Cardinal Rules

1. **🎨 Always Use Design Tokens**
   - Never hardcode colors, spacing, or other design values
   - Reference tokens via CSS variables, Tailwind classes, or theme objects

2. **🏗️ Tailwind for Structure, Emotion for Dynamics**
   - Use Tailwind CSS + shadcn/ui for static layouts and components
   - Use Emotion only when JavaScript-based dynamic styling is required

3. **🚫 Zero Tolerance for Hardcoded Values**
   - No hex codes (e.g., `#3b82f6`)
   - No pixel values (e.g., `16px`, `p-[16px]`)
   - No arbitrary values (e.g., `bg-[#...], p-[...]`)

**Before writing any styling code, ask yourself:**
- "Does this reference a design token?"
- "Can I use Tailwind instead of CSS-in-JS?"
- "Am I hardcoding any values?"

If you answered "no" to the first two, or "yes" to the third, **rewrite your code** to comply with these rules.

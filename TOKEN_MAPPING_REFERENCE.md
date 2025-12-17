# Token Mapping Quick Reference

## Philosophy

**Use semantic tokens that describe PURPOSE, not appearance.**

- ✅ `bg-surface-action` - "This is an action button"
- ❌ `bg-primary-500` - "This is purple"

## Common Mappings

### Action/Interactive Elements

| Primitive | Semantic | Use Case |
|-----------|----------|----------|
| `bg-primary-500` | `bg-surface-action` | Primary buttons, CTAs |
| `text-primary-500` | `text-content-action` | Action links, buttons |
| `border-primary-500` | `border-border-action` | Action borders |
| `hover:bg-primary-600` | `hover:bg-primary-600` | ✅ OK - Hover state |

### Text Colors

| Primitive | Semantic | Use Case |
|-----------|----------|----------|
| `text-black` | `text-content-primary` | Main text |
| `text-neutral-800` | `text-content-primary` | Main text |
| `text-neutral-600` | `text-content-subtle` | Secondary text |
| `text-neutral-500` | `text-content-muted` | Tertiary/muted text |
| `text-white` | `text-content-on-action` | Text on action buttons |

### Backgrounds

| Primitive | Semantic | Use Case |
|-----------|----------|----------|
| `bg-white` | `bg-surface-base` or `bg-surface-1` | Card backgrounds |
| `bg-neutral-50` | `bg-surface-1` | Light backgrounds |
| `bg-neutral-100` | `bg-surface-1` | Light backgrounds |
| `bg-neutral-200` | `bg-surface-2` | Medium backgrounds |

### Borders

| Primitive | Semantic | Use Case |
|-----------|----------|----------|
| `border-neutral-200` | `border-default` | Default borders |
| `border-neutral-300` | `border-default` | Default borders |
| `border-primary-500` | `border-border-action` | Action borders |
| `border-neutral-400` | `border-border-disabled` | Disabled borders |

### Signal Colors (Error, Success, Warning, Info)

| Primitive | Semantic | Use Case |
|-----------|----------|----------|
| `bg-error-500` | `bg-error` | Error states |
| `text-error-500` | `text-error` | Error text |
| `bg-success-500` | `bg-success` | Success states |
| `text-success-500` | `text-success` | Success text |
| `bg-warning-500` | `bg-warning` | Warning states |
| `text-warning-500` | `text-warning` | Warning text |
| `bg-info-500` | `bg-info` | Info states |
| `text-info-500` | `text-info` | Info text |

### Disabled States

| Primitive | Semantic | Use Case |
|-----------|----------|----------|
| `bg-neutral-200` | `bg-surface-disabled` | Disabled backgrounds |
| `border-neutral-300` | `border-border-disabled` | Disabled borders |
| `text-neutral-400` | `text-content-disabled` | Disabled text |

## When Primitives Are Acceptable

### ✅ OK to Use Primitives

1. **Hover states** (when semantic doesn't have hover variant):
   ```jsx
   hover:bg-primary-600
   hover:text-primary-600
   ```

2. **Focus rings** (standard focus color):
   ```jsx
   ring-primary-500
   focus-visible:ring-primary-500
   ```

3. **Color swatches/demos** (showing the scale itself):
   ```jsx
   // In color palette demos
   <div className="bg-primary-500">Primary 500</div>
   ```

4. **Gradients** (when creating gradients):
   ```jsx
   bg-gradient-to-r from-primary-400 to-primary-600
   ```

5. **Internal token definitions** (in token files):
   ```json
   {
     "surface-action": { "value": "{color.brand.primary.500}" }
   }
   ```

## Decision Tree

```
Need a color?
│
├─ Is it for an action/button? → Use surface-action, content-action, border-action
├─ Is it for text? → Use content-primary, content-subtle, content-muted
├─ Is it for a surface/background? → Use surface-base, surface-1, surface-2
├─ Is it for a border? → Use border-default, border-action, border-disabled
├─ Is it for error/success/warning/info? → Use error, success, warning, info
├─ Is it for hover state? → Use primary-600 (OK - exception)
├─ Is it for focus ring? → Use primary-500 (OK - exception)
└─ Is it for a color demo? → Use primitives (OK - exception)
```

## Examples

### ❌ Bad - Using Primitives

```jsx
<button className="bg-primary-500 text-white border border-primary-500">
  Click Me
</button>

<div className="bg-white border border-neutral-200">
  <p className="text-neutral-600">Content</p>
</div>
```

### ✅ Good - Using Semantic Tokens

```jsx
<button className="bg-surface-action text-content-on-action border border-border-action">
  Click Me
</button>

<div className="bg-surface-base border border-default">
  <p className="text-content-subtle">Content</p>
</div>
```

## Migration Checklist

When updating code:

- [ ] Replace `bg-primary-500` → `bg-surface-action`
- [ ] Replace `text-primary-500` → `text-content-action`
- [ ] Replace `border-primary-500` → `border-border-action`
- [ ] Replace `bg-error-500` → `bg-error`
- [ ] Replace `text-error-500` → `text-error`
- [ ] Replace `border-neutral-200` → `border-default`
- [ ] Replace `text-neutral-600` → `text-content-subtle`
- [ ] Replace `text-neutral-500` → `text-content-muted`
- [ ] Replace `bg-white` → `bg-surface-base` or `bg-surface-1`
- [ ] Keep `hover:bg-primary-600` (exception)
- [ ] Keep `ring-primary-500` (exception)


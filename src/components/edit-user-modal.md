# Edit User Modal Component

## Overview

The `EditUserModal` component is a dialog-based form for editing user information. It was implemented from a Figma design and follows the project's design system principles.

## Design Source

- **Figma URL**: https://www.figma.com/design/jUnRPwgzbain4XcJQdPxWt/Untitled?node-id=4-544
- **Component Type**: Modal Dialog
- **Design System**: Uses semantic design tokens

## Features

- ✅ Fully accessible dialog using Radix UI primitives
- ✅ Form with username and email fields
- ✅ Icon decorations using lucide-react
- ✅ Cancel and Save actions
- ✅ Controlled component with state management
- ✅ Responsive design
- ✅ Theme-aware (light/dark mode support)

## Usage

### Basic Example

```jsx
import EditUserModal from '@/components/edit-user-modal'
import { useState } from 'react'

function MyComponent() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Edit User
      </button>
      
      <EditUserModal 
        open={open}
        onOpenChange={setOpen}
        defaultValues={{
          username: 'johndoe',
          email: 'john.doe@example.com'
        }}
      />
    </>
  )
}
```

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `open` | `boolean` | Yes | - | Controls the open/closed state of the modal |
| `onOpenChange` | `(open: boolean) => void` | No | - | Callback when the modal state changes |
| `defaultValues` | `{ username?: string, email?: string }` | No | `{}` | Initial values for the form fields |

## Design Token Usage

This component follows the project's design system rules and uses semantic tokens:

### Colors
- `text-content-primary` - Main text (labels, title)
- `text-content-muted` - Placeholder text and icons
- `text-content-on-action` - Text on action buttons
- `bg-surface-1` - Input backgrounds
- `bg-surface-action` - Primary button background
- `border-default` - Input borders

### Spacing
- `p-4` - Padding (16px)
- `gap-2` - Gap between elements (8px)
- `gap-4` - Larger gap (16px)

### Border Radius
- `rounded-md` - Medium border radius (4px)
- `rounded-lg` - Large border radius (8px)

### Typography
- `text-xl` - Title (20px)
- `text-sm` - Form labels and button text (14px)

## Component Structure

```
EditUserModal
├── Dialog (Radix UI)
│   └── DialogContent
│       ├── DialogHeader
│       │   └── DialogTitle ("Edit User")
│       ├── Form Content
│       │   ├── Username Field
│       │   │   ├── Label
│       │   │   └── Input (with User icon)
│       │   └── Email Field
│       │       ├── Label
│       │       └── Input (with Mail icon)
│       └── DialogFooter
│           ├── Cancel Button (outline variant)
│           └── Save Button (default variant with Save icon)
```

## Dependencies

- `@radix-ui/react-dialog` - Accessible dialog primitive
- `lucide-react` - Icons (User, Mail, Save)
- `@/components/ui/dialog` - Dialog wrapper components
- `@/components/ui/button` - Button component
- `@/components/ui/input` - Input component
- `@/components/ui/label` - Label component

## Accessibility

- ✅ Keyboard navigation support (Tab, Escape)
- ✅ Focus management (auto-focus on first input)
- ✅ ARIA labels and roles
- ✅ Screen reader friendly
- ✅ Proper form semantics

## Styling Approach

This component uses **Tailwind CSS** for all styling, as per the project's hybrid styling guidelines:

- **Static layouts and positioning**: Tailwind classes
- **Design tokens**: Referenced via Tailwind utilities (e.g., `bg-surface-1`, `text-content-primary`)
- **No hardcoded values**: All colors, spacing, and other design properties use tokens

### Why Not Emotion?

Emotion is reserved for **dynamic styling** that requires JavaScript state/props. Since this modal's styling is static (no computed colors, no dynamic animations based on props), Tailwind is the appropriate choice.

## Form Handling

The component includes basic form state management. For production use, consider integrating with:

- **React Hook Form** - For advanced form validation
- **Zod** - For schema validation
- **Server Actions** - For form submission

Example with React Hook Form:

```jsx
import { useForm } from 'react-hook-form'

function EditUserModal({ open, onOpenChange, defaultValues }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  })

  const onSubmit = (data) => {
    console.log('Form data:', data)
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields with {...register('username')} */}
      </form>
    </Dialog>
  )
}
```

## Testing

### Storybook

The component includes Storybook stories for visual testing:

```bash
npm run storybook
```

Stories available:
- `Default` - With pre-filled values
- `Empty` - With empty fields
- `WithLongValues` - Testing overflow behavior

### Unit Tests (Future)

Recommended test cases:
- [ ] Modal opens and closes correctly
- [ ] Form fields accept input
- [ ] Cancel button closes modal without saving
- [ ] Save button triggers submission
- [ ] Escape key closes modal
- [ ] Focus management works correctly

## Figma Code Connect

This component has a Figma Code Connect mapping file (`edit-user-modal.figma.jsx`) that links it to the Figma design. This enables developers to see the code directly in Figma Dev Mode.

To publish the mapping:

```bash
npx figma connect publish
```

## Future Enhancements

- [ ] Add form validation
- [ ] Add loading state for async operations
- [ ] Add success/error toast notifications
- [ ] Add confirmation dialog for unsaved changes
- [ ] Add avatar upload functionality
- [ ] Add more user fields (phone, role, etc.)
- [ ] Add keyboard shortcuts (Cmd/Ctrl+S to save)

## Related Components

- `ZampleModal` - Another modal example in the project
- `Dialog` - Base dialog component from shadcn/ui
- `Button` - Action buttons
- `Input` - Form inputs
- `Label` - Form labels


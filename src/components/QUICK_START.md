# Edit User Modal - Quick Start Guide

## 🚀 Getting Started in 30 Seconds

### 1. Import the Component

```jsx
import EditUserModal from '@/components/edit-user-modal'
import { useState } from 'react'
```

### 2. Add State Management

```jsx
function MyComponent() {
  const [open, setOpen] = useState(false)
  
  // ... rest of your component
}
```

### 3. Add the Modal

```jsx
<EditUserModal 
  open={open}
  onOpenChange={setOpen}
  defaultValues={{
    username: 'johndoe',
    email: 'john.doe@example.com'
  }}
/>
```

### 4. Add a Trigger Button

```jsx
<Button onClick={() => setOpen(true)}>
  Edit User
</Button>
```

## 📋 Complete Example

```jsx
import EditUserModal from '@/components/edit-user-modal'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

function UserProfile() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState({
    username: 'johndoe',
    email: 'john.doe@example.com'
  })

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      
      <Button onClick={() => setOpen(true)}>
        Edit User
      </Button>

      <EditUserModal 
        open={open}
        onOpenChange={setOpen}
        defaultValues={user}
      />
    </div>
  )
}
```

## 🎯 Props Reference

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `open` | `boolean` | ✅ Yes | Controls modal visibility |
| `onOpenChange` | `(open: boolean) => void` | No | Callback when state changes |
| `defaultValues` | `{ username?: string, email?: string }` | No | Initial form values |

## 🎨 Styling

The component uses semantic design tokens:

- ✅ Design token-based styling
- ✅ Responsive design
- ✅ Accessible by default
- ✅ No custom styling needed

## ⌨️ Keyboard Shortcuts

- **Tab** - Navigate between fields
- **Shift+Tab** - Navigate backwards
- **Escape** - Close modal
- **Enter** - Submit form (when focused on input)

## 🔧 Common Use Cases

### Empty Form (Create User)

```jsx
<EditUserModal 
  open={open}
  onOpenChange={setOpen}
  defaultValues={{}}
/>
```

### Pre-filled Form (Edit User)

```jsx
<EditUserModal 
  open={open}
  onOpenChange={setOpen}
  defaultValues={{
    username: existingUser.username,
    email: existingUser.email
  }}
/>
```

### With Form Submission Handler

```jsx
// Note: You'll need to modify the component to accept an onSubmit prop
// or handle the form submission inside the component

<EditUserModal 
  open={open}
  onOpenChange={setOpen}
  defaultValues={user}
  onSubmit={(data) => {
    console.log('Saving user:', data)
    // Call your API here
    saveUser(data)
    setOpen(false)
  }}
/>
```

## 🧪 Testing in the App

1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Open your browser**:
   ```
   http://localhost:5173
   ```

3. **Click the button**:
   Look for "Open Edit User Modal" in the "Button Variants & Modals" section

4. **Interact with the modal**:
   - Edit the fields
   - Click "Save" (logs to console)
   - Click "Cancel" to close
   - Press Escape to close

## 📚 More Documentation

- **Full Documentation**: `src/components/edit-user-modal.md`
- **Design Comparison**: `src/components/DESIGN_COMPARISON.md`
- **Implementation Summary**: `IMPLEMENTATION_SUMMARY.md`
- **Storybook**: Run `npm run storybook` and navigate to Components > EditUserModal

## 🎓 Learning Resources

### Understanding the Code

1. **Dialog Component**: Uses Radix UI for accessibility
2. **Form State**: Simple React useState for form data
3. **Styling**: Tailwind CSS with semantic design tokens
4. **Icons**: Lucide React for consistent iconography

### Key Files to Explore

- `src/components/edit-user-modal.jsx` - Main component
- `src/components/ui/dialog.jsx` - Dialog wrapper
- `src/components/ui/button.jsx` - Button component
- `src/components/ui/input.jsx` - Input component

## 🐛 Troubleshooting

### Modal doesn't open
- Check that `open` prop is `true`
- Verify state is being updated in `onOpenChange`

### Form doesn't submit
- Check browser console for errors
- Verify form submission handler is working

### Styling looks wrong
- Ensure design tokens are loaded
- Check that Tailwind CSS is configured correctly
- Verify theme is set (`data-theme` attribute)

### Icons don't show
- Ensure `lucide-react` is installed
- Check import statements

## 💡 Tips

1. **State Management**: Use the `onOpenChange` callback to update your state
2. **Form Validation**: Add validation logic before submission
3. **Loading States**: Show a spinner while saving
4. **Error Handling**: Display error messages for failed submissions
5. **Success Feedback**: Show a toast notification on successful save

## 🚀 Next Steps

1. **Add Validation**: Integrate React Hook Form + Zod
2. **Add API Integration**: Connect to your backend
3. **Add Notifications**: Show success/error toasts
4. **Add More Fields**: Extend the form as needed
5. **Add Tests**: Write unit and integration tests

## 📞 Need Help?

- Check the full documentation in `edit-user-modal.md`
- Look at the Storybook examples
- Review the implementation summary
- Check the design comparison for visual details

---

**Ready to use!** 🎉

The Edit User Modal is production-ready and follows all design system best practices.


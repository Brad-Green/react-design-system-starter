import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Mail, Save } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function EditUserModal({ open, onOpenChange, defaultValues = {} }) {
  const [formData, setFormData] = React.useState({
    username: defaultValues.username || '',
    email: defaultValues.email || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    onOpenChange?.(false)
  }

  const handleCancel = () => {
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0">
        {/* Header */}
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-xl font-semibold text-content-primary">
            Edit User
          </DialogTitle>
        </DialogHeader>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-4 space-y-4">
            {/* Username Field */}
            <div className="flex items-center gap-2">
              <Label 
                htmlFor="username" 
                className="text-sm font-medium text-content-primary w-[80px] text-left shrink-0"
              >
                Username
              </Label>
              <div className="relative flex-1">
                <User 
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-content-muted" 
                  aria-hidden="true"
                />
                <Input
                  id="username"
                  type="text"
                  placeholder="Value"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="pl-9 h-9 text-sm bg-surface-1 border-default placeholder:text-content-muted"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex items-center gap-2">
              <Label 
                htmlFor="email" 
                className="text-sm font-medium text-content-primary w-[80px] text-left shrink-0"
              >
                Email
              </Label>
              <div className="relative flex-1">
                <Mail 
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-content-muted" 
                  aria-hidden="true"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Value"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-9 h-9 text-sm bg-surface-1 border-default placeholder:text-content-muted"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="p-4 pt-0 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              size="sm"
              className="text-sm"
            >
              <Save className="h-3.5 w-3.5" aria-hidden="true" />
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


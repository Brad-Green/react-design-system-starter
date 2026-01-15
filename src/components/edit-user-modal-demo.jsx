import * as React from 'react'
import EditUserModal from './edit-user-modal'
import { Button } from '@/components/ui/button'

export default function EditUserModalDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex items-center justify-center min-h-screen bg-surface-base p-8">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold text-content-primary">
          Edit User Modal Demo
        </h1>
        <p className="text-content-subtle">
          Click the button below to open the Edit User modal
        </p>
        <Button onClick={() => setOpen(true)}>
          Open Edit User Modal
        </Button>
      </div>

      <EditUserModal 
        open={open}
        onOpenChange={setOpen}
        defaultValues={{
          username: 'johndoe',
          email: 'john.doe@example.com'
        }}
      />
    </div>
  )
}


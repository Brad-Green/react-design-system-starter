import figma from '@figma/code-connect'
import EditUserModal from './edit-user-modal'

figma.connect(
  EditUserModal,
  'https://www.figma.com/design/jUnRPwgzbain4XcJQdPxWt/Untitled?node-id=4-544',
  {
    example: () => (
      <EditUserModal 
        open={true}
        onOpenChange={(open) => console.log('Dialog state:', open)}
        defaultValues={{
          username: 'johndoe',
          email: 'john@example.com'
        }}
      />
    ),
  }
)


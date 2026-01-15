import EditUserModal from './edit-user-modal'

export default {
  title: 'Components/EditUserModal',
  component: EditUserModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export const Default = {
  args: {
    open: true,
    defaultValues: {
      username: 'johndoe',
      email: 'john.doe@example.com',
    },
  },
}

export const Empty = {
  args: {
    open: true,
    defaultValues: {
      username: '',
      email: '',
    },
  },
}

export const WithLongValues = {
  args: {
    open: true,
    defaultValues: {
      username: 'verylongusernamethatmightoverflow',
      email: 'verylongemailaddress@exampledomainname.com',
    },
  },
}


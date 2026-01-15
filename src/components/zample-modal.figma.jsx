import figma from '@figma/code-connect'
import ZampleModal from './zample-modal'

figma.connect(
  ZampleModal,
  'https://www.figma.com/design/Yxmv7qGrcf4NSWGThrJrCJ/Zample?node-id=1-148',
  {
    example: () => (
      <ZampleModal onClose={() => console.log('Modal closed')} />
    ),
  }
)


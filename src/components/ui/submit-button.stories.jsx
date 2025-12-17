import { SubmitButton } from './submit-button';

export default {
  title: 'Components/SubmitButton',
  component: SubmitButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show/hide the arrow icon',
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
  },
};

// Default state
export const Default = {
  args: {
    children: 'Submit',
    showIcon: true,
    disabled: false,
  },
};

// Without icon
export const WithoutIcon = {
  args: {
    children: 'Submit',
    showIcon: false,
  },
};

// Disabled state
export const Disabled = {
  args: {
    children: 'Submit',
    disabled: true,
    showIcon: true,
  },
};

// Custom text
export const CustomText = {
  args: {
    children: 'Continue',
    showIcon: true,
  },
};

// In a form context
export const InForm = {
  render: () => (
    <form className="space-y-4 w-80 p-6 bg-surface-base rounded-lg">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-content-primary">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-default rounded-md text-content-primary"
        />
      </div>
      <SubmitButton className="w-full">
        Submit Form
      </SubmitButton>
    </form>
  ),
};

// Theme comparison
export const ThemeComparison = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-content-primary mb-4">Light Theme</h3>
        <div className="flex gap-4">
          <SubmitButton>Submit</SubmitButton>
          <SubmitButton disabled>Disabled</SubmitButton>
          <SubmitButton showIcon={false}>No Icon</SubmitButton>
        </div>
      </div>
      
      <div data-theme="dark" className="p-6 bg-surface-background rounded-lg">
        <h3 className="text-sm font-medium text-content-primary mb-4">Dark Theme</h3>
        <div className="flex gap-4">
          <SubmitButton>Submit</SubmitButton>
          <SubmitButton disabled>Disabled</SubmitButton>
          <SubmitButton showIcon={false}>No Icon</SubmitButton>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates automatic theme adaptation using design tokens',
      },
    },
  },
};

// Multiple sizes demo
export const SizeVariations = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <SubmitButton size="sm">Small Submit</SubmitButton>
      <SubmitButton size="default">Default Submit</SubmitButton>
      <SubmitButton size="lg">Large Submit</SubmitButton>
    </div>
  ),
};

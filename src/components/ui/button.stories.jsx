import { Button } from './button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    asChild: {
      control: 'boolean',
      description: 'Merge props with child element (Radix Slot)',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
};

// Default story with controls
export const Default = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
    disabled: false,
  },
};

// Variant stories
export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Destructive = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

export const Outline = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Ghost = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Link = {
  args: {
    children: 'Link',
    variant: 'link',
  },
};

// Size stories
export const AllSizes = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Small = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Large = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Icon = {
  render: () => (
    <Button size="icon" variant="outline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </Button>
  ),
};

// State stories
export const Disabled = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Default</Button>
      <Button disabled variant="destructive">Destructive</Button>
      <Button disabled variant="outline">Outline</Button>
      <Button disabled variant="secondary">Secondary</Button>
      <Button disabled variant="ghost">Ghost</Button>
      <Button disabled variant="link">Link</Button>
    </div>
  ),
};

// With Icons
export const WithIcon = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
        With Icon
      </Button>
      <Button variant="outline">
        Send Email
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </Button>
    </div>
  ),
};

// Theme demonstration
export const ThemeComparison = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-content-primary">Primary Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Primary Default</Button>
          <Button variant="default" size="sm">Primary Small</Button>
          <Button variant="default" size="lg">Primary Large</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4 text-content-primary">Secondary Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4 text-content-primary">Destructive Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="destructive">Delete</Button>
          <Button variant="destructive" size="sm">Remove</Button>
          <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
            Cancel
          </Button>
        </div>
      </div>

      <div className="mt-8 p-4 rounded-md bg-surface-1">
        <p className="text-sm text-content-subtle mb-2">
          💡 <strong>Theme Switching:</strong> Use the backgrounds toolbar (paint palette icon) 
          to toggle between light and dark themes and see how the buttons adapt using design tokens.
        </p>
      </div>
    </div>
  ),
};

// Loading state example
export const WithLoadingState = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>
        <svg
          className="animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        Loading...
      </Button>
      <Button variant="outline" disabled>
        <svg
          className="animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        Processing...
      </Button>
    </div>
  ),
};

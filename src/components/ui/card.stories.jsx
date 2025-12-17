import { Button } from './button';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card';

export default {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

// Basic card
export const Basic = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. This is a simple card with basic structure.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

// Card without footer
export const WithoutFooter = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
            <div>
              <p className="text-sm font-medium">New message from John</p>
              <p className="text-sm text-content-muted">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
            <div>
              <p className="text-sm font-medium">Update available</p>
              <p className="text-sm text-content-muted">1 hour ago</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
            <div>
              <p className="text-sm font-medium">Task completed</p>
              <p className="text-sm text-content-muted">3 hours ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

// Card with form
export const WithForm = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Enter your details to create a new account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  ),
};

// Multiple cards
export const MultipleCards = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
          <CardDescription>Active users this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">2,543</div>
          <p className="text-xs text-content-muted mt-2">+12% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Total revenue this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-success">$45,231</div>
          <p className="text-xs text-content-muted mt-2">+8% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Orders processed this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-secondary">1,234</div>
          <p className="text-xs text-content-muted mt-2">+5% from last month</p>
        </CardContent>
      </Card>
    </div>
  ),
};

// Card with list
export const WithList = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>Manage your team members and their roles.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-content-muted">john@example.com</p>
            </div>
            <Button size="sm" variant="outline">Edit</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Jane Smith</p>
              <p className="text-xs text-content-muted">jane@example.com</p>
            </div>
            <Button size="sm" variant="outline">Edit</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Bob Johnson</p>
              <p className="text-xs text-content-muted">bob@example.com</p>
            </div>
            <Button size="sm" variant="outline">Edit</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">Add Member</Button>
      </CardFooter>
    </Card>
  ),
};

// Card with image
export const WithImage = {
  render: () => (
    <Card className="w-[350px] overflow-hidden">
      <div className="h-[200px] bg-gradient-to-br from-primary-400 to-secondary-400" />
      <CardHeader>
        <CardTitle>Beautiful Landscape</CardTitle>
        <CardDescription>A stunning view from the mountains</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-content-subtle">
          Experience the breathtaking beauty of nature with this amazing landscape 
          photograph captured at sunset.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Share</Button>
        <Button>Download</Button>
      </CardFooter>
    </Card>
  ),
};

// Compact card
export const Compact = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-content-muted">Views</p>
            <p className="font-semibold">12.5k</p>
          </div>
          <div>
            <p className="text-content-muted">Clicks</p>
            <p className="font-semibold">3.2k</p>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

// Interactive card
export const Interactive = {
  render: () => (
    <Card className="w-[350px] hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <CardTitle>Pro Plan</CardTitle>
        <CardDescription>For professional developers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold">$29</span>
          <span className="text-content-muted">/month</span>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Unlimited projects
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Priority support
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Advanced analytics
          </li>
          <li className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Custom integrations
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Upgrade Now</Button>
      </CardFooter>
    </Card>
  ),
};

// Theme comparison
export const ThemeComparison = {
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Light Theme Card</CardTitle>
            <CardDescription>Default card styling in light theme</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-content-subtle">
              This card uses design tokens that automatically adapt to the current theme.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Learn More</Button>
          </CardFooter>
        </Card>

        <Card className="bg-surface-2">
          <CardHeader>
            <CardTitle>Surface Variant</CardTitle>
            <CardDescription>Card with alternative background</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-content-subtle">
              Using surface-2 token for a slightly different background shade.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="secondary">Explore</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="p-4 rounded-md bg-surface-1">
        <p className="text-sm text-content-subtle">
          💡 <strong>Theme Switching:</strong> Use the backgrounds toolbar (paint palette icon) 
          to toggle between light and dark themes and see how the cards adapt using design tokens.
        </p>
      </div>
    </div>
  ),
};

// Empty state card
export const EmptyState = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>No items found</CardTitle>
        <CardDescription>Get started by creating your first item</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <svg
          className="h-12 w-12 text-content-muted mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-sm text-content-muted text-center mb-4">
          You haven't created any items yet. Click the button below to get started.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create Item</Button>
      </CardFooter>
    </Card>
  ),
};

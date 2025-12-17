# Storybook Configuration Guide

## Overview
Storybook v10.1.7 has been successfully installed and configured for this React + Vite project. It serves as the component documentation, visualization, and testing platform for your design system.

## Installation Details

### Installed Packages
The following packages were added to `devDependencies`:
- `storybook@^10.1.7` - Core Storybook CLI and runtime
- `@storybook/react-vite@^10.1.7` - Vite builder for React
- `@chromatic-com/storybook@^4.1.3` - Chromatic integration
- `@storybook/addon-vitest@^10.1.7` - Vitest integration for component testing
- `@storybook/addon-a11y@^10.1.7` - Accessibility testing addon
- `@storybook/addon-docs@^10.1.7` - Documentation generation
- `@storybook/addon-onboarding@^10.1.7` - Onboarding experience
- `prop-types@^15.8.1` - Runtime type checking
- `vitest` - Test runner (optional)
- `playwright` - Browser automation (optional, not installed)
- `@vitest/browser-playwright` - Browser testing provider (optional)
- `@vitest/coverage-v8` - Code coverage (optional)

### NPM Scripts Added
```json
{
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

## Configuration Files

### `.storybook/main.js`
Main Storybook configuration with:
- **Stories Pattern**: Searches for `*.stories.@(js|jsx|mjs|ts|tsx)` and `*.mdx` files in `src/**`
- **Framework**: React with Vite builder
- **Addons**: Chromatic, Vitest, a11y, Docs, Onboarding
- **Path Aliases**: `@/` mapped to `src/` directory via `viteFinal` config

```javascript
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };
    return config;
  }
};
```

### `.storybook/preview.js`
Global Storybook configuration for all stories:

**Imports**:
- `src/index.css` - Tailwind CSS directives
- `build/css/variables.css` - Light theme design tokens
- `build/css/variables-dark.css` - Dark theme design tokens

**Theme Switching**:
- Uses built-in `backgrounds` toolbar for light/dark toggle
- Decorator applies `data-theme` attribute to document root
- Light theme: `data-theme="light"` (default)
- Dark theme: `data-theme="dark"` (when dark background selected)

**Addons Configuration**:
- **Controls**: Auto-detects color and date inputs
- **A11y Testing**: Set to "todo" mode (shows violations in UI, doesn't fail builds)
- **Backgrounds**: Light (#ffffff) and Dark (#1a1a1a) options

```javascript
import '../src/index.css';
import '../build/css/variables.css';
import '../build/css/variables-dark.css';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo" // Show violations without failing
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.backgrounds?.value === '#1a1a1a';
      const theme = isDark ? 'dark' : 'light';
      
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
      }
      
      return Story();
    },
  ],
};
```

### `.storybook/vitest.setup.js`
Auto-generated Vitest configuration for running component tests.

## How to Use

### Running Storybook
```bash
npm run storybook
```
Storybook will start at **http://localhost:6006/**

### Building Storybook for Production
```bash
npm run build-storybook
```
Generates static site in `storybook-static/` directory

### Theme Toggle
1. Open any story in Storybook
2. Look for the **backgrounds** toolbar button (paint palette icon)
3. Select "light" or "dark" to switch themes
4. Design token CSS variables automatically update via `data-theme` attribute

## Design System Integration

### Tailwind CSS
- All Tailwind utility classes work in stories
- Design tokens mapped to Tailwind theme (colors, spacing, borders)
- Example: `bg-primary-500`, `text-content-primary`, `p-4`, `rounded-md`

### CSS Variables
- Light theme variables loaded from `build/css/variables.css`
- Dark theme variables loaded from `build/css/variables-dark.css`
- Variables scoped by `[data-theme="dark"]` selector
- Accessible in all stories automatically

### Path Aliases
- Use `@/components` to import from `src/components`
- Use `@/lib` to import from `src/lib`
- Works consistently with main app configuration

## Writing Stories

### Story File Location
Place story files alongside components:
```
src/
  components/
    ui/
      button.jsx
      button.stories.jsx  ← Story file
      card.jsx
      card.stories.jsx    ← Story file
```

### Basic Story Template
```javascript
import { Button } from './button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export const Default = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const Destructive = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};
```

## Accessibility Testing

The `@storybook/addon-a11y` addon is configured and active:
- **A11y Panel**: Available in addon panel for each story
- **Test Mode**: Set to "todo" (violations shown but don't fail builds)
- **Automatic Checks**: Runs on every story render
- **WCAG Standards**: Checks against WCAG AA standards

### To Use
1. Open any story
2. Click the "Accessibility" tab in the addon panel
3. Review violations, passes, and incomplete checks
4. Fix issues in component code

## Available Addons

### Essential Addons (Pre-configured)
- **Controls**: Interactive component props editor
- **Actions**: Event handler logging
- **Viewport**: Responsive design testing
- **Backgrounds**: Theme switching (light/dark)
- **Docs**: Auto-generated documentation
- **A11y**: Accessibility testing

### Additional Addons (Can be added)
- **Interactions**: User interaction testing
- **Links**: Navigate between stories
- **Measure**: Layout measurement tools
- **Outline**: Visual element boundaries

## Integration with Design Tokens

### Token Build Workflow
1. Edit design tokens: `tokens/fdb-design-tokens.json`
2. Build tokens: `npm run tokens:build`
3. Tokens automatically available in Storybook via:
   - CSS variables (imported in preview.js)
   - Tailwind classes (configured in tailwind.config.js)

### Using Tokens in Stories
```javascript
// Via Tailwind classes
<Button className="bg-primary-500 text-white">Click me</Button>

// Via CSS variables (in styled components or inline styles)
<div style={{ color: 'var(--color-content-primary)' }}>Text</div>
```

## Troubleshooting

### Common Issues

**No stories found**:
- Ensure story files end with `.stories.jsx` or `.stories.js`
- Check that files are in `src/` directory
- Verify story glob patterns in `.storybook/main.js`

**Styles not loading**:
- Run `npm run tokens:build` to generate CSS variables
- Verify imports in `.storybook/preview.js`
- Check browser console for import errors

**Theme toggle not working**:
- Ensure `data-theme` attribute is being set on `<html>` element
- Verify dark theme CSS is properly scoped with `[data-theme="dark"]`
- Check backgrounds addon is active in toolbar

**Path aliases not resolving**:
- Verify `viteFinal` configuration in `.storybook/main.js`
- Check that imports use `@/` prefix
- Ensure jsconfig.json paths match

## Next Steps

### Phase 4 Step #2: Integrate Hybrid Components
1. Write stories for Button component (shadcn/ui)
2. Write stories for Card component (shadcn/ui)
3. Document all variants, sizes, and states
4. Test with light/dark themes
5. Verify accessibility with a11y addon

### Future Enhancements
- Add interaction tests with `@storybook/addon-interactions`
- Document design token usage in MDX files
- Create component composition examples
- Set up visual regression testing with Chromatic
- Add custom theme decorator for Emotion (if Phase 3 Step #3 completed)

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Accessibility Addon](https://storybook.js.org/addons/@storybook/addon-a11y)
- [Vite Builder](https://storybook.js.org/docs/react/builders/vite)

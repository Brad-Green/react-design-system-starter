# React Design System Starter

A production-ready React design system starter template featuring design tokens, hybrid styling (Tailwind CSS + Emotion), Figma integration, and comprehensive component documentation.

## 🎯 Features

- **🎨 Design Token System** - Style Dictionary-powered token management with light/dark theme support
- **⚡ Hybrid Styling** - Tailwind CSS + shadcn/ui for structure, Emotion for dynamic styling
- **🎭 Figma Integration** - Code Connect for design-to-code sync and MCP server for AI-assisted development
- **📚 Storybook** - Interactive component documentation with accessibility testing
- **🌓 Theme Support** - Automatic light/dark theme switching via CSS variables
- **♿ Accessibility** - WCAG-compliant components with built-in a11y testing
- **🤖 AI Governance** - Comprehensive rules and guidelines for AI-assisted development

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- (Optional) Figma account for Code Connect integration

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd react-design-system-starter

# Install dependencies
npm install

# Build design tokens
npm run tokens:build

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run tokens:build` | Generate CSS and JS token files from design tokens |
| `npm run tokens:audit` | Audit design token usage and compliance |
| `npm run storybook` | Start Storybook component documentation |
| `npm run build-storybook` | Build static Storybook site |
| `npm run verify-mcp` | Verify Figma MCP server connection |
| `npm run lint` | Run ESLint |

## 🏗️ Project Structure

```
react-design-system-starter/
├── src/
│   ├── components/
│   │   └── ui/              # shadcn/ui components
│   │       ├── button.jsx
│   │       ├── button.stories.jsx
│   │       ├── button.figma.jsx  # Figma Code Connect
│   │       └── ...
│   ├── lib/
│   │   └── utils.js         # Utility functions (cn helper)
│   ├── theme/
│   │   └── emotionTheme.js  # Emotion theme configuration
│   ├── App.jsx
│   └── main.jsx
├── tokens/
│   ├── fdb-design-tokens.json      # Light theme tokens
│   └── fdb-design-tokens-dark.json # Dark theme tokens
├── build/
│   ├── css/                 # Generated CSS variables
│   └── js/                 # Generated JS theme objects
├── build-tokens.js          # Style Dictionary build script
├── tailwind.config.js       # Tailwind configuration
├── components.json          # shadcn/ui configuration
├── figma.config.json        # Figma Code Connect config
└── AGENTS.md                # AI governance rules
```

## 🎨 Design System Architecture

### Design Tokens

Design tokens are the foundation of this design system. They're defined in JSON files and automatically converted to CSS variables and JavaScript objects.

**Token Categories:**
- **Colors**: Brand, neutral, signal (success/warning/error/info), surface, content, border
- **Spacing**: 0-96px scale
- **Borders**: Radius (none, sm, md, lg, xl) and width (none, thin, medium, thick)

**Token Philosophy:**
- ✅ **Use semantic tokens** that describe purpose: `bg-surface-action`, `text-content-primary`
- ❌ **Avoid primitive tokens** that describe appearance: `bg-primary-500`, `text-neutral-800`

See [`TOKEN_MAPPING_REFERENCE.md`](./TOKEN_MAPPING_REFERENCE.md) for complete mapping guide.

### Hybrid Styling Approach

This project uses a **hybrid styling strategy**:

1. **Tailwind CSS + shadcn/ui** - For static layouts, component structure, and standard styling
2. **Emotion** - For dynamic styling that requires JavaScript (animations, computed styles, theme-dependent logic)

**When to use Tailwind:**
```jsx
// Static layouts, standard styling
<div className="flex flex-col gap-4 p-6 bg-surface-base rounded-lg">
  <h2 className="text-xl font-semibold text-content-primary">Title</h2>
  <Button variant="default">Click Me</Button>
</div>
```

**When to use Emotion:**
```jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTheme } from '@emotion/react';

function DynamicComponent({ progress, isActive }) {
  const theme = useTheme();
  
  return (
    <div
      css={css`
        background-color: ${isActive ? theme.colorBrandPrimary500 : theme.colorNeutral200};
        width: ${progress}%;
        transition: all 0.3s ease;
      `}
    >
      Progress: {progress}%
    </div>
  );
}
```

### Theme System

The design system uses a light theme with design tokens:

- Design tokens are defined as CSS variables
- Emotion theme object provides runtime access to tokens
- All styling references tokens for consistency
- No manual theme handling required in components

## 📚 Documentation

- **[AGENTS.md](./AGENTS.md)** - AI governance rules and styling guidelines
- **[TOKEN_MAPPING_REFERENCE.md](./TOKEN_MAPPING_REFERENCE.md)** - Complete token mapping guide
- **[COMPONENT_BUILDING_GUIDE.md](./COMPONENT_BUILDING_GUIDE.md)** - Guide for building components with shadcn/ui
- **[STORYBOOK_SETUP.md](./STORYBOOK_SETUP.md)** - Storybook configuration and usage
- **[SESSION_SUMMARY.md](./SESSION_SUMMARY.md)** - Project setup history and decisions
- **[NEXT_STEPS.md](./NEXT_STEPS.md)** - Project roadmap and next actions

## 🔗 Figma Integration

### Code Connect

Figma Code Connect maps Figma components to React code, enabling developers to see code examples directly in Figma Dev Mode.

**Setup:**
1. Create a Figma personal access token with Code Connect write access
2. Add token to `.env` file: `FIGMA_ACCESS_TOKEN=your_token`
3. Configure component mappings in `*.figma.jsx` files
4. Publish connections: `npx figma connect publish`

See component files like `button.figma.jsx` for mapping examples.

### MCP Server

The Figma MCP (Model Context Protocol) server enables AI-assisted component generation directly from Figma designs.

**Capabilities:**
- Extract design tokens from Figma variables
- Generate components from Figma designs
- Capture design screenshots for reference
- Get component metadata and structure

## 🧩 Components

### Available Components

- **Button** - Multiple variants (default, destructive, outline, secondary, ghost, link) and sizes
- **Card** - Flexible card component with header, content, and footer sections
- **Dialog** - Modal dialog component (Radix UI)
- **Input** - Form input component
- **Label** - Form label component
- **EditUserModal** - Modal dialog for editing user information
- **ZampleModal** - Example modal demonstrating design system patterns
- **SubmitButton** - Primary action button with icon

### Adding New Components

1. **Install from shadcn/ui** (if available):
   ```bash
   npx shadcn@latest add [component-name]
   ```

2. **Create Storybook stories** in `*.stories.jsx`

3. **Add Figma Code Connect mapping** (if applicable) in `*.figma.jsx`

4. **Follow styling guidelines** in [`AGENTS.md`](./AGENTS.md)

## 🎯 Core Principles

### 1. Always Use Design Tokens

**Never hardcode values.** All styling must reference design tokens.

```jsx
// ✅ CORRECT
<div className="bg-surface-action text-content-on-action p-4 rounded-md">

// ❌ WRONG
<div className="bg-[#6d3ba9] text-white p-[16px] rounded-[8px]">
```

### 2. Prefer Semantic Tokens

Use tokens that describe **purpose**, not appearance.

```jsx
// ✅ CORRECT - Semantic
<button className="bg-surface-action text-content-on-action">

// ❌ WRONG - Primitive
<button className="bg-primary-500 text-white">
```

### 3. Tailwind for Structure, Emotion for Dynamics

- Use Tailwind for static layouts and standard styling
- Use Emotion only when JavaScript-based dynamic styling is required

## 🧪 Testing

### Storybook

View and test components in isolation:

```bash
npm run storybook
```

Stories include:
- All component variants
- Interactive controls
- Accessibility testing (a11y addon)
- Theme switching examples

### Token Auditing

Audit design token usage for compliance:

```bash
npm run tokens:audit
```

## 🤝 Contributing

When contributing to this design system:

1. **Follow AGENTS.md rules** - All styling must use design tokens
2. **Add Storybook stories** - Document all new components
3. **Test accessibility** - Ensure WCAG compliance
4. **Update Figma mappings** - Keep Code Connect mappings current
5. **Use semantic tokens** - Prefer purpose-based tokens over primitives

## 📝 License

[Add your license here]

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Component library foundation
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Emotion](https://emotion.sh/) - CSS-in-JS library
- [Style Dictionary](https://amzn.github.io/style-dictionary/) - Design token management
- [Storybook](https://storybook.js.org/) - Component documentation
- [Figma](https://www.figma.com/) - Design tool integration

---

**Built with ❤️ for scalable, maintainable design systems**


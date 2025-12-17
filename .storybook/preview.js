import '../src/index.css'; // Tailwind directives
import '../build/css/variables.css'; // Light theme design tokens
import '../build/css/variables-dark.css'; // Dark theme design tokens

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    },
    
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
      ],
    },
  },

  decorators: [
    (Story, context) => {
      // Apply theme based on backgrounds toolbar selection
      const isDark = context.globals.backgrounds?.value === '#1a1a1a';
      const theme = isDark ? 'dark' : 'light';
      
      // Apply theme attribute to document
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
      }
      
      return Story();
    },
  ],
};

export default preview;

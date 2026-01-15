import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import App from './App.jsx'
import './index.css'
import '../build/css/variables.css'
import '../build/css/variables-compat.css'  // Compatibility layer for old token names
import '../build/css/variables-dark.css'
import { lightTheme, darkTheme } from './theme/emotionTheme.js'

// ThemeProvider wrapper that syncs with data-theme attribute
function ThemedApp() {
  const [currentTheme, setCurrentTheme] = React.useState(() => {
    // Get initial theme from data-theme attribute or default to light
    const root = document.documentElement;
    return root.getAttribute('data-theme') === 'dark' ? darkTheme : lightTheme;
  });

  // Watch for theme changes via data-theme attribute
  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const theme = document.documentElement.getAttribute('data-theme');
          setCurrentTheme(theme === 'dark' ? darkTheme : lightTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <App />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemedApp />
  </React.StrictMode>,
)

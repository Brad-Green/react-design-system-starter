module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true
          },
          filter: (token) => {
            // Filter out theme sets we don't want in the default :root
            // We'll handle Light/Dark separately
            const path = token.path.join('/');
            return !path.startsWith('Colors/Dark') && 
                   !path.startsWith('Typography/Zoom') && 
                   !path.startsWith('Spacing/Zoom');
          }
        },
        {
          destination: 'variables-dark.css',
          format: 'css/variables',
          selector: '[data-theme="dark"]',
          options: {
            outputReferences: true
          },
          filter: (token) => {
            // Only include dark theme colors
            return token.path[0] === 'Colors' && token.path[1] === 'Dark';
          }
        }
      ],
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'size/rem',
        'color/css'
      ]
    }
  },
  transform: {
    'size/px': {
      type: 'value',
      matcher: (token) => {
        return token.type === 'number' || 
               token.type === 'borderRadius' || 
               token.type === 'borderWidth' ||
               token.type === 'spacing';
      },
      transformer: (token) => {
        return `${token.value}px`;
      }
    }
  }
};

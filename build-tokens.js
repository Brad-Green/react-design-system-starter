import StyleDictionary from 'style-dictionary';

// Register custom format that adds px to numeric values
StyleDictionary.registerFormat({
  name: 'css/variables-px',
  format: ({ dictionary, options }) => {
    const selector = options.selector || ':root';
    return `/**
 * Do not edit directly, this file was auto-generated.
 */

${selector} {
${dictionary.allTokens
  .map(token => {
    let value = token.value;
    // Add px to numeric values that aren't 0
    if (typeof value === 'number' && value !== 0 && token.type === 'dimension') {
      value = `${value}px`;
    }
    return `  --${token.name}: ${value};`;
  })
  .join('\n')}
}
`;
  }
});

// Build for light theme (default :root)
const sdLight = new StyleDictionary({
  source: ['tokens/fdb-design-tokens.json'],
  platforms: {
    css: {
      buildPath: 'build/css/',
      transforms: ['attribute/cti', 'name/kebab', 'color/css'],
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables-px',
          options: {
            outputReferences: false
          }
        }
      ]
    },
    js: {
      buildPath: 'build/js/',
      transforms: ['attribute/cti', 'name/camel', 'color/hex'],
      files: [
        {
          destination: 'theme-light.js',
          format: 'javascript/es6',
          options: {
            outputReferences: false
          }
        }
      ]
    }
  }
});

// Build for dark theme
const sdDark = new StyleDictionary({
  source: ['tokens/fdb-design-tokens-dark.json'],
  platforms: {
    css: {
      buildPath: 'build/css/',
      transforms: ['attribute/cti', 'name/kebab', 'color/css'],
      files: [
        {
          destination: 'variables-dark.css',
          format: 'css/variables-px',
          options: {
            selector: '[data-theme="dark"]',
            outputReferences: false
          }
        }
      ]
    },
    js: {
      buildPath: 'build/js/',
      transforms: ['attribute/cti', 'name/camel', 'color/hex'],
      files: [
        {
          destination: 'theme-dark.js',
          format: 'javascript/es6',
          options: {
            outputReferences: false
          }
        }
      ]
    }
  }
});

console.log('Building light theme tokens...');
await sdLight.buildAllPlatforms();

console.log('Building dark theme tokens...');
await sdDark.buildAllPlatforms();

console.log('✅ Tokens built successfully!');
console.log('📁 CSS Output: build/css/variables.css');
console.log('📁 CSS Output: build/css/variables-dark.css');
console.log('📁 JS Output: build/js/theme-light.js');
console.log('📁 JS Output: build/js/theme-dark.js');

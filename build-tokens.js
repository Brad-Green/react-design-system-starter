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
    // Check for spacing, border radius, font size, or dimension types
    if (typeof value === 'number' && value !== 0) {
      const needsPx = token.type === 'dimension' || 
                      token.type === 'number' ||
                      token.type === 'fontSizes' ||
                      token.name.includes('spacing') || 
                      token.name.includes('radius') ||
                      token.name.includes('font-size');
      if (needsPx) {
        value = `${value}px`;
      }
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
  log: { verbosity: 'verbose' },  // Enable verbose logging
  source: ['tokens/fdb-design-tokens-resolved.json'],
  platforms: {
    css: {
      buildPath: 'build/css/',
      transforms: ['attribute/cti', 'name/kebab', 'color/css'],
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables-px',
          options: {
            outputReferences: false  // Disable - already resolved by flatten script
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
            outputReferences: false  // Resolve all references to actual values
          }
        }
      ]
    }
  }
});

console.log('Building light theme tokens from GitHub...');
await sdLight.buildAllPlatforms();

console.log('✅ Tokens built successfully!');
console.log('📁 CSS Output: build/css/variables.css');
console.log('📁 JS Output: build/js/theme-light.js');
console.log('');
console.log('ℹ️  Note: Dark theme disabled - using light theme only');

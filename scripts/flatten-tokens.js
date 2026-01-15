import fs from 'fs';
import path from 'path';

// Read the GitHub token file
const tokenFile = fs.readFileSync('tokens/fdb-design-tokens.json', 'utf8');
const tokens = JSON.parse(tokenFile);

// Function to flatten nested objects and extract all tokens
function flattenTokens(obj, prefix = '') {
  let result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (value && typeof value === 'object') {
      if (value.value !== undefined) {
        // This is a token
        result[newKey] = value;
      } else if (key !== '$metadata' && key !== '$themes' && key !== 'global') {
        // This is a nested group, recurse
        Object.assign(result, flattenTokens(value, newKey));
      }
    }
  }
  
  return result;
}

// Flatten all tokens
const flatTokens = flattenTokens(tokens);

// Now resolve references
function resolveReferences(tokens, maxIterations = 10) {
  let resolved = JSON.parse(JSON.stringify(tokens)); // Deep clone
  let changed = true;
  let iterations = 0;
  
  while (changed && iterations < maxIterations) {
    changed = false;
    iterations++;
    
    for (const [key, token] of Object.entries(resolved)) {
      // Handle simple string references
      if (typeof token.value === 'string' && token.value.startsWith('{') && token.value.endsWith('}')) {
        // This is a reference
        const refName = token.value.slice(1, -1); // Remove { and }
        
        // Try to find the referenced token
        let foundToken = null;
        
        // Try exact match first
        if (resolved[refName]) {
          foundToken = resolved[refName];
        } else {
          // Try to find by searching all keys with flexible matching
          for (const [searchKey, searchToken] of Object.entries(resolved)) {
            // Try various matching strategies
            const searchKeyLower = searchKey.toLowerCase();
            const refNameLower = refName.toLowerCase();
            
            if (searchKey.endsWith('.' + refName) || 
                searchKey === refName ||
                searchKeyLower.endsWith('.' + refNameLower) ||
                searchKeyLower === refNameLower ||
                searchKey.replace(/\//g, '.').endsWith('.' + refName) ||
                searchKey.split('.').pop() === refName.split('.').pop()) {
              foundToken = searchToken;
              break;
            }
          }
        }
        
        if (foundToken && (typeof foundToken.value !== 'string' || (typeof foundToken.value === 'string' && !foundToken.value.startsWith('{')))) {
          resolved[key].value = foundToken.value;
          changed = true;
        }
      }
      
      // Handle composite values (objects with multiple properties that may have references)
      if (typeof token.value === 'object' && token.value !== null && !Array.isArray(token.value)) {
        for (const [propKey, propValue] of Object.entries(token.value)) {
          if (typeof propValue === 'string' && propValue.startsWith('{') && propValue.endsWith('}')) {
            const refName = propValue.slice(1, -1);
            let foundToken = null;
            
            if (resolved[refName]) {
              foundToken = resolved[refName];
            } else {
              for (const [searchKey, searchToken] of Object.entries(resolved)) {
                const searchKeyLower = searchKey.toLowerCase();
                const refNameLower = refName.toLowerCase();
                
                if (searchKey.endsWith('.' + refName) || 
                    searchKey === refName ||
                    searchKeyLower.endsWith('.' + refNameLower) ||
                    searchKeyLower === refNameLower ||
                    searchKey.replace(/\//g, '.').endsWith('.' + refName) ||
                    searchKey.split('.').pop() === refName.split('.').pop()) {
                  foundToken = searchToken;
                  break;
                }
              }
            }
            
            if (foundToken && (typeof foundToken.value !== 'string' || (typeof foundToken.value === 'string' && !foundToken.value.startsWith('{')))) {
              resolved[key].value[propKey] = foundToken.value;
              changed = true;
            }
          }
        }
      }
    }
  }
  
  return resolved;
}

console.log('Flattening tokens...');
const resolvedTokens = resolveReferences(flatTokens);

// Convert back to Style Dictionary format
const output = {};

for (const [key, token] of Object.entries(resolvedTokens)) {
  const parts = key.split('.');
  let current = output;
  
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  
  current[parts[parts.length - 1]] = token;
}

// Write the flattened and resolved tokens
fs.writeFileSync(
  'tokens/fdb-design-tokens-resolved.json',
  JSON.stringify(output, null, 2)
);

console.log('✅ Tokens flattened and resolved!');
console.log('📁 Output: tokens/fdb-design-tokens-resolved.json');
console.log(`📊 Total tokens: ${Object.keys(resolvedTokens).length}`);


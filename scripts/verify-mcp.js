#!/usr/bin/env node

/**
 * MCP Connection Verification Script
 * 
 * This script helps verify that the Figma MCP server is accessible
 * and the configuration is correct.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MCP_SERVER_URL = 'http://127.0.0.1:3845/mcp';
const MCP_CONFIG_PATH = path.join(__dirname, '..', 'mcp.json');

console.log('🔍 Verifying Figma MCP Configuration...\n');

// Check 1: Verify mcp.json exists
console.log('1. Checking mcp.json configuration...');
if (fs.existsSync(MCP_CONFIG_PATH)) {
  try {
    const config = JSON.parse(fs.readFileSync(MCP_CONFIG_PATH, 'utf8'));
    console.log('   ✅ mcp.json exists');
    
    if (config.servers && config.servers['figma-desktop']) {
      const server = config.servers['figma-desktop'];
      console.log(`   ✅ figma-desktop server configured`);
      console.log(`      Type: ${server.type}`);
      console.log(`      URL: ${server.url}`);
      
      if (server.url === MCP_SERVER_URL) {
        console.log('   ✅ URL matches expected value');
      } else {
        console.log(`   ⚠️  URL differs from expected (${MCP_SERVER_URL})`);
      }
    } else {
      console.log('   ❌ figma-desktop server not found in config');
    }
  } catch (error) {
    console.log('   ❌ Error parsing mcp.json:', error.message);
  }
} else {
  console.log('   ❌ mcp.json not found at:', MCP_CONFIG_PATH);
}

console.log('\n2. Testing MCP server connection...');

// Check 2: Test MCP server connection
const url = new URL(MCP_SERVER_URL);
const options = {
  hostname: url.hostname,
  port: url.port,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
};

const testRequest = {
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: {
      name: 'mcp-verification-script',
      version: '1.0.0',
    },
  },
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      if (response.jsonrpc === '2.0') {
        console.log('   ✅ MCP server is responding');
        console.log('   ✅ Server supports JSON-RPC 2.0');
        if (response.result) {
          console.log('   ✅ Server initialized successfully');
        } else if (response.error) {
          console.log(`   ⚠️  Server returned error: ${response.error.message}`);
          console.log('      (This may be normal if server requires authentication)');
        }
      } else {
        console.log('   ⚠️  Unexpected response format');
      }
    } catch (error) {
      console.log('   ⚠️  Server responded but response is not valid JSON');
      console.log('      Response:', data.substring(0, 100));
    }
    
    console.log('\n✅ Verification complete!');
    console.log('\nNext steps:');
    console.log('1. Ensure Figma Desktop App is running');
    console.log('2. Verify MCP server is enabled in Figma preferences');
    console.log('3. Test connection in Cursor chat');
    console.log('4. See MCP_TESTING_GUIDE.md for detailed testing steps');
  });
});

req.on('error', (error) => {
  if (error.code === 'ECONNREFUSED') {
    console.log('   ❌ Connection refused - MCP server is not running');
    console.log('\n   Troubleshooting:');
    console.log('   1. Open Figma Desktop App');
    console.log('   2. Enable MCP server in Figma preferences');
    console.log('   3. Verify server is running on port 3845');
  } else if (error.code === 'ETIMEDOUT') {
    console.log('   ❌ Connection timeout - Server may be slow or unreachable');
  } else {
    console.log('   ❌ Connection error:', error.message);
  }
  
  console.log('\n⚠️  Verification incomplete');
  console.log('\nNext steps:');
  console.log('1. Ensure Figma Desktop App is running');
  console.log('2. Enable MCP server in Figma preferences');
  console.log('3. See MCP_TESTING_GUIDE.md for troubleshooting');
});

req.on('timeout', () => {
  req.destroy();
  console.log('   ❌ Request timeout');
});

req.write(JSON.stringify(testRequest));
req.end();


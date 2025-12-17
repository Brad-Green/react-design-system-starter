#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRIMITIVE_PATTERNS = [
  /(bg|text|border)-primary-[0-9]+/g,
  /(bg|text|border)-neutral-[0-9]+/g,
];

const EXCEPTIONS = [
  'hover:bg-primary-600',
  'hover:text-primary-600',
  'hover:border-primary-600',
  'ring-primary-500',
  'focus:ring-primary-500',
  'focus-visible:ring-primary-500',
];

const SEMANTIC_MAPPINGS = {
  'bg-primary-500': 'bg-surface-action',
  'text-primary-500': 'text-content-action',
  'border-primary-500': 'border-border-action',
  'bg-error-500': 'bg-error',
  'text-error-500': 'text-error',
  'bg-neutral-200': 'border-default or bg-surface-1',
  'text-neutral-600': 'text-content-subtle',
  'text-neutral-500': 'text-content-muted',
  'border-neutral-200': 'border-default',
  'bg-white': 'bg-surface-base or bg-surface-1',
  'text-black': 'text-content-primary',
};

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];

  PRIMITIVE_PATTERNS.forEach(pattern => {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const token = match[0];
      const isException = EXCEPTIONS.some(exception => {
        // Check if token is part of an exception pattern
        const context = content.substring(Math.max(0, match.index - 20), match.index + token.length + 20);
        return context.includes(exception);
      });

      if (!isException) {
        const line = content.substring(0, match.index).split('\n').length;
        const suggestion = SEMANTIC_MAPPINGS[token] || 'Check TOKEN_MAPPING_REFERENCE.md';
        
        issues.push({
          file: filePath,
          line,
          token,
          suggestion,
        });
      }
    }
  });

  return issues;
}

function main() {
  const files = glob.sync('src/**/*.{js,jsx,ts,tsx}', { cwd: path.join(__dirname, '..') });
  const allIssues = [];

  files.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    if (fs.existsSync(fullPath)) {
      const issues = auditFile(fullPath);
      allIssues.push(...issues);
    }
  });

  if (allIssues.length > 0) {
    console.log(`\n⚠️  Found ${allIssues.length} primitive token usage(s):\n`);
    
    const grouped = allIssues.reduce((acc, issue) => {
      if (!acc[issue.file]) acc[issue.file] = [];
      acc[issue.file].push(issue);
      return acc;
    }, {});

    Object.entries(grouped).forEach(([file, issues]) => {
      console.log(`\n📄 ${file}:`);
      issues.forEach(issue => {
        console.log(`   Line ${issue.line}: ${issue.token}`);
        console.log(`   → Use: ${issue.suggestion}`);
      });
    });

    console.log('\n💡 See TOKEN_MAPPING_REFERENCE.md for complete mapping guide');
    console.log('💡 See SEMANTIC_TOKENS_ENFORCEMENT.md for enforcement strategy\n');
    process.exit(1);
  } else {
    console.log('✅ No primitive tokens found! All tokens are semantic.\n');
  }
}

main();


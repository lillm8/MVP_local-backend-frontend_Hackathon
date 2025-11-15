#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DEFAULT_ROOT = path.resolve(process.cwd(), 'src');
const IGNORE_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  'coverage',
]);

function isDirectory(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch {
    return false;
  }
}

function listDir(filePath) {
  try {
    return fs.readdirSync(filePath);
  } catch {
    return [];
  }
}

function isEmptyOrOnlyIndexTs(absDirPath) {
  const entries = listDir(absDirPath).filter((name) => name !== '.DS_Store');
  if (entries.length === 0) return { match: true, reason: 'empty' };
  if (entries.length === 1 && entries[0] === 'index.ts') return { match: true, reason: 'only index.ts' };
  return { match: false, reason: '' };
}

function walkDirs(rootDir, results) {
  const queue = [rootDir];
  while (queue.length > 0) {
    const current = queue.pop();
    const items = listDir(current);
    const dirCheck = isEmptyOrOnlyIndexTs(current);
    if (dirCheck.match) {
      results.push({ dir: current, reason: dirCheck.reason });
    }

    for (const name of items) {
      if (name.startsWith('.')) continue;
      if (IGNORE_DIRS.has(name)) continue;
      const abs = path.join(current, name);
      if (isDirectory(abs)) queue.push(abs);
    }
  }
}

function main() {
  const rootArg = process.argv[2];
  const root = path.resolve(process.cwd(), rootArg || DEFAULT_ROOT);
  if (!isDirectory(root)) {
    console.error(`Root directory not found: ${root}`);
    process.exit(2);
  }

  const results = [];
  walkDirs(root, results);

  if (results.length === 0) {
    console.log('No empty folders or folders containing only index.ts found.');
    process.exit(0);
  }

  console.log('Found folders that are empty or contain only index.ts:');
  for (const r of results.sort((a, b) => a.dir.localeCompare(b.dir))) {
    const rel = path.relative(process.cwd(), r.dir) || '.';
    console.log(`- ${rel} (${r.reason})`);
  }

  // Exit with non-zero to signal finding candidates in CI if desired
  process.exit(1);
}

main();



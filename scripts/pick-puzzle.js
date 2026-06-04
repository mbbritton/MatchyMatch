#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Generate random puzzle index (0-19 for 20 puzzles)
const randomIndex = Math.floor(Math.random() * 20);

// Write to .env.production
const envContent = `VITE_PUZZLE_INDEX=${randomIndex}
`;
const envPath = path.join(__dirname, '..', '.env.production');

fs.writeFileSync(envPath, envContent, 'utf8');
console.log(`✓ Puzzle index set to ${randomIndex} in .env.production`);

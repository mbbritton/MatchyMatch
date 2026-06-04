#!/usr/bin/env node

/**
 * Script to randomly select a puzzle index and write it to .env.production
 * This ensures each build serves a single fixed puzzle
 */

const fs = require('fs');
const path = require('path');

// Generate random puzzle index (0-19 for 20 puzzles)
const randomIndex = Math.floor(Math.random() * 20);

// Write to .env.production
const envContent = `VITE_PUZZLE_INDEX=${randomIndex}\n`;
const envPath = path.join(__dirname, '..', '.env.production');

fs.writeFileSync(envPath, envContent, 'utf8');
console.log(`✓ Puzzle index set to ${randomIndex} in .env.production`);

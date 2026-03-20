const fs = require('fs');
const path = require('path');

const PUZZLE_COUNT = 20;
const index = Math.floor(Math.random() * PUZZLE_COUNT);
const envPath = path.join(__dirname, '..', '.env.production');

fs.writeFileSync(envPath, `VITE_PUZZLE_INDEX=${index}\n`);
console.log(`[pick-puzzle] Selected puzzle index: ${index}`);

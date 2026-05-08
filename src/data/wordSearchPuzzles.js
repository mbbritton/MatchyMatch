/**
 * Word Search puzzles.
 * Each puzzle has a theme, a list of words, and a pre-built grid.
 * Grids are 10×10 uppercase letters.
 * Words are hidden horizontally (L→R), vertically (T→B), and diagonally (↘).
 * The `placements` array records where each word starts so we can validate selections.
 *   { word, row, col, dir }  dir: 'H' | 'V' | 'D'
 */

export const PUZZLES = [
  {
    id: "animals",
    theme: "Animals",
    emoji: "🐾",
    words: ["CAT", "DOG", "BEAR", "LION", "WOLF", "DEER", "FROG", "HAWK"],
    placements: [
      { word: "CAT",  row: 0, col: 0, dir: "H" },
      { word: "DOG",  row: 1, col: 5, dir: "H" },
      { word: "BEAR", row: 2, col: 2, dir: "H" },
      { word: "LION", row: 4, col: 0, dir: "H" },
      { word: "WOLF", row: 6, col: 3, dir: "H" },
      { word: "DEER", row: 8, col: 1, dir: "H" },
      { word: "FROG", row: 0, col: 7, dir: "V" },
      { word: "HAWK", row: 3, col: 9, dir: "V" },
    ],
    grid: [
      ["C","A","T","X","P","Q","Z","F","M","K"],
      ["N","V","B","W","E","D","O","G","R","A"],
      ["S","J","B","E","A","R","L","O","G","W"],
      ["T","U","I","Y","P","C","D","Q","H","H"],
      ["L","I","O","N","F","G","Z","M","A","A"],
      ["X","K","R","S","V","B","N","T","W","W"],
      ["P","Q","W","W","O","L","F","U","K","K"],
      ["M","Z","A","C","D","E","H","J","X","X"],
      ["B","D","E","E","R","F","G","I","L","L"],
      ["Y","N","T","S","Q","P","V","W","O","O"],
    ],
  },
  {
    id: "space",
    theme: "Space",
    emoji: "🚀",
    words: ["MOON", "STAR", "MARS", "ORBIT", "COMET", "SOLAR", "NEBULA", "SATURN"],
    placements: [
      { word: "MOON",   row: 0, col: 0, dir: "H" },
      { word: "STAR",   row: 1, col: 4, dir: "H" },
      { word: "MARS",   row: 3, col: 2, dir: "H" },
      { word: "ORBIT",  row: 5, col: 0, dir: "H" },
      { word: "COMET",  row: 7, col: 3, dir: "H" },
      { word: "SOLAR",  row: 9, col: 0, dir: "H" },
      { word: "NEBULA", row: 0, col: 7, dir: "V" },
      { word: "SATURN", row: 4, col: 9, dir: "V" },
    ],
    grid: [
      ["M","O","O","N","X","P","Q","N","Z","K"],
      ["V","B","W","E","S","T","A","R","G","A"],
      ["J","I","Y","P","C","D","Q","E","H","W"],
      ["T","M","A","R","S","G","Z","B","A","H"],
      ["X","K","R","S","V","B","N","U","W","S"],
      ["O","R","B","I","T","N","T","L","K","A"],
      ["P","Q","W","C","D","E","H","A","X","T"],
      ["M","Z","A","C","O","M","E","T","L","U"],
      ["B","D","F","G","I","J","K","O","N","R"],
      ["S","O","L","A","R","P","V","W","X","N"],
    ],
  },
  {
    id: "food",
    theme: "Food",
    emoji: "🍕",
    words: ["RICE", "SOUP", "CAKE", "TACO", "PASTA", "BREAD", "SALAD", "PIZZA"],
    placements: [
      { word: "RICE",  row: 0, col: 0, dir: "H" },
      { word: "SOUP",  row: 1, col: 5, dir: "H" },
      { word: "CAKE",  row: 3, col: 1, dir: "H" },
      { word: "TACO",  row: 5, col: 4, dir: "H" },
      { word: "PASTA", row: 7, col: 0, dir: "H" },
      { word: "BREAD", row: 9, col: 2, dir: "H" },
      { word: "SALAD", row: 0, col: 8, dir: "V" },
      { word: "PIZZA", row: 2, col: 6, dir: "V" },
    ],
    grid: [
      ["R","I","C","E","X","P","Q","Z","S","K"],
      ["N","V","B","W","E","S","O","U","P","A"],
      ["J","I","Y","P","C","D","P","Q","L","L"],
      ["T","C","A","K","E","G","I","Z","A","A"],
      ["X","K","R","S","V","B","Z","N","D","D"],
      ["P","Q","W","C","T","A","C","O","K","X"],
      ["M","Z","A","D","E","H","J","L","X","T"],
      ["P","A","S","T","A","F","G","I","O","N"],
      ["B","D","F","G","I","J","K","L","M","S"],
      ["Y","N","B","R","E","A","D","W","X","Q"],
    ],
  },
  {
    id: "sports",
    theme: "Sports",
    emoji: "⚽",
    words: ["GOLF", "POLO", "SWIM", "SURF", "RUGBY", "TENNIS", "BOXING", "HOCKEY"],
    placements: [
      { word: "GOLF",   row: 0, col: 0, dir: "H" },
      { word: "POLO",   row: 1, col: 5, dir: "H" },
      { word: "SWIM",   row: 3, col: 2, dir: "H" },
      { word: "SURF",   row: 5, col: 0, dir: "H" },
      { word: "RUGBY",  row: 7, col: 3, dir: "H" },
      { word: "TENNIS", row: 9, col: 0, dir: "H" },
      { word: "BOXING", row: 0, col: 8, dir: "V" },
      { word: "HOCKEY", row: 4, col: 9, dir: "V" },
    ],
    grid: [
      ["G","O","L","F","X","P","Q","Z","B","K"],
      ["N","V","B","W","E","P","O","L","O","A"],
      ["J","I","Y","P","C","D","Q","X","X","W"],
      ["T","U","S","W","I","M","Z","M","I","H"],
      ["X","K","R","S","V","B","N","U","N","O"],
      ["S","U","R","F","T","N","T","L","G","C"],
      ["P","Q","W","C","D","E","H","A","X","K"],
      ["M","Z","A","R","U","G","B","Y","L","E"],
      ["B","D","F","G","I","J","K","O","N","Y"],
      ["T","E","N","N","I","S","V","W","X","X"],
    ],
  },
  {
    id: "nature",
    theme: "Nature",
    emoji: "🌿",
    words: ["LAKE", "HILL", "CAVE", "REEF", "RIVER", "CLOUD", "STORM", "FOREST"],
    placements: [
      { word: "LAKE",   row: 0, col: 0, dir: "H" },
      { word: "HILL",   row: 1, col: 5, dir: "H" },
      { word: "CAVE",   row: 3, col: 2, dir: "H" },
      { word: "REEF",   row: 5, col: 4, dir: "H" },
      { word: "RIVER",  row: 7, col: 0, dir: "H" },
      { word: "CLOUD",  row: 9, col: 3, dir: "H" },
      { word: "STORM",  row: 0, col: 8, dir: "V" },
      { word: "FOREST", row: 4, col: 9, dir: "V" },
    ],
    grid: [
      ["L","A","K","E","X","P","Q","Z","S","K"],
      ["N","V","B","W","E","H","I","L","L","A"],
      ["J","I","Y","P","C","D","Q","X","O","W"],
      ["T","U","C","A","V","E","Z","M","R","H"],
      ["X","K","R","S","V","B","N","U","M","F"],
      ["P","Q","W","C","R","E","E","F","X","O"],
      ["M","Z","A","D","E","H","J","L","X","R"],
      ["R","I","V","E","R","F","G","I","O","E"],
      ["B","D","F","G","I","J","K","L","M","S"],
      ["Y","N","T","C","L","O","U","D","X","T"],
    ],
  },
];

/** Pick a random puzzle, optionally excluding one by id */
export function pickPuzzle(excludeId = null) {
  const pool = excludeId ? PUZZLES.filter((p) => p.id !== excludeId) : PUZZLES;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Given a placement and a grid, return all {row, col} cells the word occupies.
 */
export function getWordCells({ word, row, col, dir }) {
  return word.split("").map((_, i) => ({
    row: dir === "H" ? row : row + i,
    col: dir === "V" ? col : dir === "H" ? col + i : col + i,
  }));
}

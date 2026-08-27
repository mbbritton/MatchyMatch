# 🔍 Derrick's Derrictive

## Overview

**Derrick's Derrictive** is a detective-themed deduction game added to the MatchyMatch repository. Named after the legendary sleuth Derrick, this game challenges players to crack the case by deducing a secret mystery word from a series of clever clues — one clue at a time!

The name is a pun on **Derrick** + **Detective** = **Derrictive**. 🕵️

## How to Play

1. **Start the Game**: Click "Start Investigation" from the menu
2. **Read the Clue**: Derrick reveals one clue about the mystery word
3. **Make a Guess**: Type your guess into the input field and submit
4. **Get Feedback**: Derrick tells you if you're right, wrong, or getting warmer
5. **Reveal More Clues**: If you're stuck, click "Next Clue" to reveal another hint (costs points)
6. **Solve the Case**: Identify the mystery word before you run out of clues!

## Game Rules

- **Clues**: Each mystery has up to 5 clues, revealed one at a time
- **Scoring**:
  - Solve on clue 1 → 500 points
  - Solve on clue 2 → 400 points
  - Solve on clue 3 → 300 points
  - Solve on clue 4 → 200 points
  - Solve on clue 5 → 100 points
- **Guesses**: Unlimited guesses per clue — only advancing to the next clue costs points
- **Win Condition**: Correctly identify the mystery word
- **Lose Condition**: Exhaust all 5 clues without a correct guess

## Features

- 🔍 **Detective Theme**: Atmospheric mystery-solving experience
- 🧩 **Multiple Mysteries**: 10 different mystery words across varied categories
- 📊 **Score Tracking**: Points based on how few clues you needed
- 💡 **Progressive Hints**: Each new clue narrows down the answer
- 🎉 **Celebration**: Confetti on a successful solve
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile

## Mystery Categories

1. **Animals** — Identify creatures from behavioural and physical clues
2. **Places** — Deduce famous locations from geographical hints
3. **Objects** — Figure out everyday items from descriptive clues
4. **Food** — Guess dishes and ingredients from taste/texture hints
5. **Concepts** — Abstract ideas described through metaphor

## Technical Details

### Component Structure
- **DerricksDerrictiveBoard.jsx**: Main game component with all game logic

### Game States
- `menu`: Initial menu / case-select screen
- `playing`: Active investigation
- `won`: Case solved!
- `lost`: All clues exhausted without a correct guess

### Key Features
- React hooks for state management (`useState`, `useEffect`)
- Case-insensitive answer matching
- Dynamic clue reveal system
- Real-time score calculation
- Responsive layout with CSS variables for theming

## Scoring Summary

| Clues Used | Points Awarded |
|------------|---------------|
| 1          | 500           |
| 2          | 400           |
| 3          | 300           |
| 4          | 200           |
| 5          | 100           |
| All used, no solve | 0    |

## Future Enhancements

Potential improvements for Derrick's Derrictive:
- Difficulty levels (Rookie, Detective, Master Sleuth)
- Leaderboard / high scores
- Daily mystery challenge
- Custom mystery creation
- Sound effects (dramatic music, case-solved fanfare)
- Animated Derrick character
- Multiplayer / competitive mode

## Why "Derrick's Derrictive"?

The name is a playful pun combining **Derrick** (the creator's name) with **Detective** — making **Derrictive**. Just like a great detective pieces together clues to crack a case, players piece together hints to identify the mystery word. Elementary, my dear player! 🔍

---

**Good luck, and may your deductions be swift!** 🕵️‍♂️

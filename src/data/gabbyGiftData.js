/**
 * Gabby's Gift of Gab - Memory card sets.
 * Each set has a theme related to communication and conversation.
 * The board duplicates each item to create pairs.
 */

export const GABBY_CARD_SETS = [
  {
    id: "expressions",
    label: "Expressions",
    emoji: "😊",
    cards: ["😊", "😂", "🤔", "😍", "😎", "🤗", "😴", "🤩"],
  },
  {
    id: "communication",
    label: "Communication",
    emoji: "💬",
    cards: ["💬", "📱", "✉️", "📞", "💌", "📧", "📮", "🗨️"],
  },
  {
    id: "languages",
    label: "Languages",
    emoji: "🌍",
    cards: ["🇬🇧", "🇫🇷", "🇪🇸", "🇩🇪", "🇮🇹", "🇯🇵", "🇨🇳", "🇰🇷"],
  },
  {
    id: "gestures",
    label: "Gestures",
    emoji: "👋",
    cards: ["👋", "👍", "👏", "🤝", "✌️", "🤙", "👌", "🙏"],
  },
  {
    id: "conversation",
    label: "Conversation",
    emoji: "🗣️",
    cards: ["🗣️", "👂", "👀", "🧠", "💭", "💡", "❓", "❗"],
  },
];

/**
 * Build a shuffled deck of card objects from a set.
 * Each card appears twice (as a pair).
 */
export function buildGabbyDeck(set) {
  const pairs = [...set.cards, ...set.cards].map((emoji, i) => ({
    id: i,
    emoji,
    pairKey: emoji,
    flipped: false,
    matched: false,
  }));
  // Fisher-Yates shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}

/** Pick a random set */
export function pickRandomGabbySet() {
  return GABBY_CARD_SETS[Math.floor(Math.random() * GABBY_CARD_SETS.length)];
}

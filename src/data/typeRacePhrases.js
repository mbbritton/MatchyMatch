/**
 * Type Race phrase bank.
 * Each entry: { id, text, category }
 */
export const TYPE_RACE_PHRASES = [
  // ── General knowledge ───────────────────────────────────────────
  { id: 1,  category: "Science",     text: "The mitochondria is the powerhouse of the cell." },
  { id: 2,  category: "Science",     text: "Water is composed of two hydrogen atoms and one oxygen atom." },
  { id: 3,  category: "Science",     text: "The speed of light in a vacuum is approximately three hundred thousand kilometres per second." },
  { id: 4,  category: "Science",     text: "Black holes are regions of spacetime where gravity is so strong that nothing can escape." },
  { id: 5,  category: "Science",     text: "DNA carries the genetic instructions for the development of all known living organisms." },

  // ── History ─────────────────────────────────────────────────────
  { id: 6,  category: "History",     text: "The Berlin Wall fell on the ninth of November nineteen eighty-nine." },
  { id: 7,  category: "History",     text: "Julius Caesar was assassinated on the Ides of March in forty-four BC." },
  { id: 8,  category: "History",     text: "The first moon landing took place on the twentieth of July nineteen sixty-nine." },
  { id: 9,  category: "History",     text: "The Great Wall of China stretches over thirteen thousand miles across northern China." },
  { id: 10, category: "History",     text: "World War Two ended in nineteen forty-five with the surrender of Germany and Japan." },

  // ── Pop Culture ─────────────────────────────────────────────────
  { id: 11, category: "Pop Culture", text: "May the Force be with you." },
  { id: 12, category: "Pop Culture", text: "To infinity and beyond!" },
  { id: 13, category: "Pop Culture", text: "Elementary, my dear Watson." },
  { id: 14, category: "Pop Culture", text: "With great power comes great responsibility." },
  { id: 15, category: "Pop Culture", text: "You shall not pass!" },
  { id: 16, category: "Pop Culture", text: "I am inevitable." },
  { id: 17, category: "Pop Culture", text: "Why so serious?" },
  { id: 18, category: "Pop Culture", text: "Just keep swimming, just keep swimming." },

  // ── Tongue twisters ──────────────────────────────────────────────
  { id: 19, category: "Tongue Twister", text: "She sells seashells by the seashore." },
  { id: 20, category: "Tongue Twister", text: "How much wood would a woodchuck chuck if a woodchuck could chuck wood?" },
  { id: 21, category: "Tongue Twister", text: "Peter Piper picked a peck of pickled peppers." },
  { id: 22, category: "Tongue Twister", text: "Red lorry, yellow lorry, red lorry, yellow lorry." },
  { id: 23, category: "Tongue Twister", text: "Unique New York, unique New York, you know you need unique New York." },

  // ── Proverbs ─────────────────────────────────────────────────────
  { id: 24, category: "Proverb",     text: "A stitch in time saves nine." },
  { id: 25, category: "Proverb",     text: "The early bird catches the worm." },
  { id: 26, category: "Proverb",     text: "Actions speak louder than words." },
  { id: 27, category: "Proverb",     text: "Every cloud has a silver lining." },
  { id: 28, category: "Proverb",     text: "You can lead a horse to water but you cannot make it drink." },
  { id: 29, category: "Proverb",     text: "The pen is mightier than the sword." },
  { id: 30, category: "Proverb",     text: "All that glitters is not gold." },

  // ── Tech ─────────────────────────────────────────────────────────
  { id: 31, category: "Tech",        text: "The quick brown fox jumps over the lazy dog." },
  { id: 32, category: "Tech",        text: "Hello, world!" },
  { id: 33, category: "Tech",        text: "There are only two hard things in computer science: cache invalidation and naming things." },
  { id: 34, category: "Tech",        text: "Any sufficiently advanced technology is indistinguishable from magic." },
  { id: 35, category: "Tech",        text: "Move fast and break things." },
];

/**
 * Pick a random phrase from the bank.
 * Optionally exclude a phrase id to avoid repeats.
 */
export function pickPhrase(excludeId = null) {
  const pool = excludeId
    ? TYPE_RACE_PHRASES.filter((p) => p.id !== excludeId)
    : TYPE_RACE_PHRASES;
  return pool[Math.floor(Math.random() * pool.length)];
}

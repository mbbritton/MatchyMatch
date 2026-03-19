export const puzzles = [
  {
    id: 1,
    date: "2026-03-19",
    categories: [
      {
        id: "yellow",
        label: "YELLOW",
        color: "yellow",
        title: "Things that are always wet",
        words: ["OCEAN", "TEARS", "SWEAT", "RAIN"],
      },
      {
        id: "green",
        label: "GREEN",
        color: "green",
        title: "Dog breeds",
        words: ["POODLE", "BOXER", "HUSKY", "BEAGLE"],
      },
      {
        id: "blue",
        label: "BLUE",
        color: "blue",
        title: "___ ball",
        words: ["BASKET", "FOOT", "BASE", "SNOW"],
      },
      {
        id: "purple",
        label: "PURPLE",
        color: "purple",
        title: "Types of music",
        words: ["JAZZ", "BLUES", "ROCK", "SOUL"],
      },
    ],
  },
  {
    id: 2,
    date: "2026-03-20",
    categories: [
      {
        id: "yellow",
        label: "YELLOW",
        color: "yellow",
        title: "Things in a kitchen",
        words: ["WHISK", "LADLE", "SPATULA", "TONGS"],
      },
      {
        id: "green",
        label: "GREEN",
        color: "green",
        title: "Famous Einsteins",
        words: ["ALBERT", "BOB", "LITTLE", "FRANK"],
      },
      {
        id: "blue",
        label: "BLUE",
        color: "blue",
        title: "Words before 'storm'",
        words: ["BRAIN", "FIRE", "SNOW", "THUNDER"],
      },
      {
        id: "purple",
        label: "PURPLE",
        color: "purple",
        title: "Planets (minus Earth)",
        words: ["MARS", "VENUS", "SATURN", "MERCURY"],
      },
    ],
  },
  {
    id: 3,
    date: "2026-03-21",
    categories: [
      {
        id: "yellow",
        label: "YELLOW",
        color: "yellow",
        title: "Types of pasta",
        words: ["PENNE", "FUSILLI", "RIGATONI", "ORZO"],
      },
      {
        id: "green",
        label: "GREEN",
        color: "green",
        title: "Superhero powers",
        words: ["FLIGHT", "SPEED", "STRENGTH", "INVISIBILITY"],
      },
      {
        id: "blue",
        label: "BLUE",
        color: "blue",
        title: "___ fish",
        words: ["SWORD", "STAR", "CAT", "BLOW"],
      },
      {
        id: "purple",
        label: "PURPLE",
        color: "purple",
        title: "Board games",
        words: ["CLUE", "RISK", "SORRY", "OPERATION"],
      },
    ],
  },
];

export const COLOR_STYLES = {
  yellow: {
    bg: "bg-yellow-300",
    hover: "hover:bg-yellow-200",
    selected: "bg-yellow-400",
    text: "text-yellow-900",
    revealed: "bg-yellow-300",
  },
  green: {
    bg: "bg-green-400",
    hover: "hover:bg-green-300",
    selected: "bg-green-500",
    text: "text-green-900",
    revealed: "bg-green-400",
  },
  blue: {
    bg: "bg-blue-400",
    hover: "hover:bg-blue-300",
    selected: "bg-blue-500",
    text: "text-blue-900",
    revealed: "bg-blue-400",
  },
  purple: {
    bg: "bg-purple-400",
    hover: "hover:bg-purple-300",
    selected: "bg-purple-500",
    text: "text-purple-900",
    revealed: "bg-purple-400",
  },
};

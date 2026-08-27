// Selectable color palettes for the Arcade hub (GamePicker). Each palette
// drives the primary accent (buttons, focus rings), the "Arcade" title
// letters, and the card tile gradients — swapped together as one unit via
// the hero's palette switcher.
export const PALETTES = {
  blue: {
    label: 'Blue Screen of Awesome',
    primary: '#0086ea',
    primaryHover: '#006dc7',
    primaryPress: '#0058a3',
    tint: '#e8f3fe',
    letters: ['#0086ea', '#e31c79', '#8212c4', '#39a283', '#1629b4', '#c33d04'],
    tiles: [
      'linear-gradient(140deg, #0086ea 0%, #1629b4 100%)',
      'linear-gradient(140deg, #8212c4 0%, #1629b4 100%)',
      'linear-gradient(140deg, #e31c79 0%, #8212c4 100%)',
      'linear-gradient(140deg, #39a283 0%, #0086ea 100%)',
      'linear-gradient(140deg, #1c0087 0%, #0086ea 100%)',
      'linear-gradient(140deg, #c33d04 0%, #e31c79 100%)',
      'linear-gradient(140deg, #0086ea 0%, #39a283 100%)',
      'linear-gradient(140deg, #4e4f5f 0%, #1c0087 100%)',
    ],
  },
  pink: {
    label: 'Player Two Has Entered',
    primary: '#e31c79',
    primaryHover: '#c3125f',
    primaryPress: '#9e0f4d',
    tint: '#fdeaf3',
    letters: ['#e31c79', '#8212c4', '#0086ea', '#c33d04', '#1629b4', '#39a283'],
    tiles: [
      'linear-gradient(140deg, #e31c79 0%, #8212c4 100%)',
      'linear-gradient(140deg, #c33d04 0%, #e31c79 100%)',
      'linear-gradient(140deg, #8212c4 0%, #1629b4 100%)',
      'linear-gradient(140deg, #e31c79 0%, #1c0087 100%)',
      'linear-gradient(140deg, #8212c4 0%, #e31c79 100%)',
      'linear-gradient(140deg, #1629b4 0%, #e31c79 100%)',
      'linear-gradient(140deg, #c33d04 0%, #8212c4 100%)',
      'linear-gradient(140deg, #4e4f5f 0%, #e31c79 100%)',
    ],
  },
  green: {
    label: 'Game, Set, Match',
    primary: '#39a283',
    primaryHover: '#2f8b70',
    primaryPress: '#25725c',
    tint: '#e7f5f0',
    letters: ['#39a283', '#0086ea', '#8212c4', '#1629b4', '#c33d04', '#e31c79'],
    tiles: [
      'linear-gradient(140deg, #39a283 0%, #0086ea 100%)',
      'linear-gradient(140deg, #1629b4 0%, #39a283 100%)',
      'linear-gradient(140deg, #39a283 0%, #1c0087 100%)',
      'linear-gradient(140deg, #0086ea 0%, #39a283 100%)',
      'linear-gradient(140deg, #39a283 0%, #8212c4 100%)',
      'linear-gradient(140deg, #c33d04 0%, #39a283 100%)',
      'linear-gradient(140deg, #4e4f5f 0%, #39a283 100%)',
      'linear-gradient(140deg, #39a283 0%, #e31c79 100%)',
    ],
  },
  gold: {
    label: 'High Score, Low Effort',
    primary: '#c33d04',
    primaryHover: '#9e2f03',
    primaryPress: '#7a2402',
    tint: '#fbe9e2',
    letters: ['#c33d04', '#e31c79', '#0086ea', '#8212c4', '#39a283', '#1629b4'],
    tiles: [
      'linear-gradient(140deg, #c33d04 0%, #e31c79 100%)',
      'linear-gradient(140deg, #c33d04 0%, #8212c4 100%)',
      'linear-gradient(140deg, #c33d04 0%, #1c0087 100%)',
      'linear-gradient(140deg, #e31c79 0%, #c33d04 100%)',
      'linear-gradient(140deg, #c33d04 0%, #0086ea 100%)',
      'linear-gradient(140deg, #c33d04 0%, #39a283 100%)',
      'linear-gradient(140deg, #4e4f5f 0%, #c33d04 100%)',
      'linear-gradient(140deg, #8212c4 0%, #c33d04 100%)',
    ],
  },
}

export const PALETTE_ORDER = ['blue', 'pink', 'green', 'gold']
export const DEFAULT_PALETTE = 'blue'

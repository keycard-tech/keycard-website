export const KEYCARD_PRODUCTS = {
  ONE_CARD_SET: {
    variantId: '43948807127304',
    name: '1 card set',
    price: 25,
    cards: 1,
    tag: null,
    image: '/assets/buy/1-card.png',
  },
  TWO_CARDS_SET: {
    variantId: '50316052529416',
    name: '2 card set',
    price: 45,
    cards: 2,
    tag: null,
    image: '/assets/buy/2-card.png',
  },
  THREE_CARDS_SET: {
    variantId: '50329773539592',
    name: '3 card set',
    price: 60,
    cards: 3,
    image: '/assets/buy/3-card.png',
    tag: 'Best deal',
  },
  READER: {
    variantId: '50331110965512',
    name: 'Reader',
    price: 22,
    cards: null,
    tag: null,
    image: '',
  },
} as const

export const KEYCARD_SHELL = {
  variantId: '51010483126536',
  name: 'Shell',
  price: 149,
} as const

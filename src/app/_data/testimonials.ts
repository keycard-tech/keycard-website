export type TestimonialSourceType = 'tweet' | 'review'

export interface Testimonial {
  id: string
  quote: string
  author: string
  authorTitle: string
  handle: string
  sourceType: TestimonialSourceType
  url: string
  imageSrc: string
  imageAlt: string
  badge?: string
  badgeLabel?: string
  tweetImage?: string // URL to image/video from the tweet
  profileImage?: string // Profile picture URL (defaults to Twitter profile if not provided)
}

// Helper function to get Twitter profile image URL
const getTwitterProfileImage = (handle: string): string => {
  // Remove @ symbol if present
  const username = handle.replace('@', '')
  // Use unavatar.io service to fetch Twitter profile images
  return `https://unavatar.io/twitter/${username}`
}

export const testimonials: Testimonial[] = [
  {
    id: 'lukas-schor',
    quote: 'Amazing piece of open-source hardware and surprisingly good UX.',
    author: '@SchorLukas',
    authorTitle: 'Co-founder, Safe',
    handle: '@SchorLukas',
    sourceType: 'tweet',
    url: 'https://x.com/SchorLukas/status/1986013483352383929',
    profileImage: getTwitterProfileImage('@SchorLukas'),
    tweetImage:
      'https://pbs.twimg.com/media/G4-6c8gWAAAq0wQ?format=jpg&name=4096x4096',
    imageSrc: getTwitterProfileImage('@SchorLukas'),
    imageAlt: 'Tweet from @SchorLukas about Keycard Shell',
  },
  {
    id: 'hardware-wallets-review',
    quote:
      'Keycard Shell offers a unique approach to hardware wallet security with its modular design and open-source architecture.',
    author: 'Hardware Wallets',
    authorTitle: 'Independent reviewer',
    handle: '@hardwarewallets',
    sourceType: 'review',
    url: 'https://www.hardware-wallets.net/keycard-shell-review/',
    profileImage: '/assets/testimonials/hardware-wallets-logo-white.png',
    tweetImage: '/assets/testimonials/hwwnet_keycard-shell-2048x1365.webp',
    imageSrc: '/assets/testimonials/hardware-wallets-logo-white.png',
    imageAlt: 'Hardware Wallets review of Keycard Shell',
    badge: '93%',
    badgeLabel: 'Review score',
  },
  {
    id: 'pol-lanski',
    quote: 'Impressed by how the project is thought out',
    author: '@Pol_Lanski',
    authorTitle: 'Co-founder, Dappnode',
    handle: '@Pol_Lanski',
    sourceType: 'tweet',
    url: 'https://x.com/Pol_Lanski/status/1993635359864037787',
    profileImage: getTwitterProfileImage('@Pol_Lanski'),
    tweetImage:
      'https://pbs.twimg.com/media/G6rQy3ZaUAA8gAw?format=jpg&name=large',
    imageSrc: getTwitterProfileImage('@Pol_Lanski'),
    imageAlt: 'Tweet from @Pol_Lanski about Keycard Shell',
  },
  {
    id: 'vrycmfy',
    quote: 'Revolution in hardware wallet security',
    author: '@vrycmfy',
    authorTitle: 'Contributor, Logos, Status & Keycard',
    handle: '@vrycmfy',
    sourceType: 'tweet',
    url: 'https://x.com/vrycmfy/status/1988745426363895922',
    profileImage: getTwitterProfileImage('@vrycmfy'),
    tweetImage:
      'https://pbs.twimg.com/media/G5lxbFAXgAABjs5?format=jpg&name=large',
    imageSrc: getTwitterProfileImage('@vrycmfy'),
    imageAlt: 'Tweet from @vrycmfy about Keycard Shell',
  },
  {
    id: 'alisher',
    quote: 'The wallet that doesn’t spy on you.',
    author: '@alisher',
    authorTitle: 'Contributor, Logos, Status & Keycard',
    handle: '@alisher',
    sourceType: 'tweet',
    url: 'https://x.com/alisher/status/1997986425183105424',
    profileImage: getTwitterProfileImage('@alisher'),
    imageSrc: getTwitterProfileImage('@alisher'),
    imageAlt: 'Tweet from @alisher about Keycard Shell',
  },
]

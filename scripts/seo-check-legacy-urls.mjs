#!/usr/bin/env node

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
const BLOG_SLUG = process.env.BLOG_SLUG

const LEGACY_TESTS = [
  {
    from: '/developers/sdk/installation.html',
    to: '/en/developers/sdk/installation',
  },
  {
    from: '/docs/sdk/installation.html',
    to: '/en/developers/sdk/installation',
  },
  {
    from: '/developers/apdu/opensecurechannel.html',
    to: '/en/developers/apdu/opensecurechannel',
  },
  {
    from: '/docs/apdu/opensecurechannel.html',
    to: '/en/developers/apdu/opensecurechannel',
  },
  {
    from: '/docs/sdk/cash.html',
    to: '/en/developers/sdk/cash',
  },
  {
    from: '/docs/web3.html',
    to: '/en/developers/web3',
  },
  {
    from: '/about-us/index.html',
    to: '/en/about',
  },
  {
    from: '/about-us',
    to: '/en/about',
  },
  {
    from: '/index.html',
    to: '/en',
  },
  {
    from: '/',
    to: '/en',
  },
  {
    from: '/blog',
    to: '/en/blog',
  },
  {
    from: '/developers',
    to: '/en/developers/overview',
  },
  {
    from: '/en/developers',
    to: '/en/developers/overview',
  },
  {
    from: '/docs',
    to: '/en/developers/overview',
  },
  {
    from: '/docs/overview',
    to: '/en/developers/overview',
  },
  {
    from: '/docs/apdu',
    to: '/en/developers/apdu',
  },
  {
    from: '/docs/sdk',
    to: '/en/developers/sdk',
  },
  {
    from: '/docs/apdu/opensecurechannel.html?ref=our.status.im',
    to: '/en/developers/apdu/opensecurechannel?ref=our.status.im',
  },
  {
    from: '/developers/sdk/installation.html?buyKeycard=true',
    to: '/en/developers/sdk/installation?buyKeycard=true',
  },
]

if (BLOG_SLUG) {
  LEGACY_TESTS.push({
    from: `/blog/${BLOG_SLUG}`,
    to: `/en/blog/${BLOG_SLUG}`,
  })
} else {
  console.log('INFO: BLOG_SLUG not set; skipping /blog/<slug> redirect check.')
}

const REDIRECT_STATUSES = new Set([301, 308])

const isRedirect = status => status >= 300 && status < 400

const buildUrl = path => new URL(path, BASE_URL).toString()

async function fetchManual(url) {
  const response = await fetch(url, { redirect: 'manual' })
  return {
    status: response.status,
    location: response.headers.get('location'),
  }
}

async function testSingleHopRedirect({ from, to }) {
  const fromUrl = buildUrl(from)
  const expectedLocation = buildUrl(to)

  const first = await fetchManual(fromUrl)

  if (first.status === 404) {
    console.error(`FAIL: ${from} returned 404`)
    return false
  }

  if (!isRedirect(first.status)) {
    console.error(`FAIL: ${from} expected redirect, got ${first.status}`)
    return false
  }

  if (!REDIRECT_STATUSES.has(first.status)) {
    console.error(`FAIL: ${from} expected 301/308, got ${first.status}`)
    return false
  }

  if (!first.location) {
    console.error(`FAIL: ${from} missing Location header`)
    return false
  }

  const resolvedLocation = buildUrl(first.location)

  if (resolvedLocation !== expectedLocation) {
    console.error(
      `FAIL: ${from} expected ${expectedLocation}, got ${resolvedLocation}`,
    )
    return false
  }

  const second = await fetchManual(resolvedLocation)

  if (isRedirect(second.status)) {
    console.error(`FAIL: ${from} has redirect chain at ${resolvedLocation}`)
    return false
  }

  if (second.status >= 400) {
    console.error(
      `FAIL: ${from} final destination ${resolvedLocation} returned ${second.status}`,
    )
    return false
  }

  console.log(`PASS: ${from} -> ${to}`)
  return true
}

async function run() {
  console.log('Legacy URL redirect checks')
  console.log(`Base URL: ${BASE_URL}`)
  console.log('Ensure a dev server is running (pnpm dev) before testing.')
  console.log('')

  let allPassed = true

  for (const test of LEGACY_TESTS) {
    const ok = await testSingleHopRedirect(test)
    if (!ok) allPassed = false
  }

  if (!allPassed) {
    console.error('Some checks failed.')
    process.exit(1)
  }

  console.log('All legacy URL checks passed.')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch(error => {
    console.error('Test runner failed:', error)
    process.exit(1)
  })
}

export { run, testSingleHopRedirect }

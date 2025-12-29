#!/usr/bin/env node

/**
 * Test script for legal page SEO canonicalization
 *
 * This script verifies that:
 * 1. Legacy legal URLs redirect (308) to canonical /en/legal/* URLs
 * 2. Canonical URLs return 200 and have proper canonical metadata
 * 3. All supported locales redirect their legal pages to English
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

// Load SUPPORTED_LOCALES from the constants file to avoid hardcoding
let SUPPORTED_LOCALES
try {
  const constantsPath = path.join(__dirname, '../src/i18n/constants.ts')
  const constantsContent = fs.readFileSync(constantsPath, 'utf8')
  const match = constantsContent.match(
    /export const SUPPORTED_LOCALES = (\[.*?\])/s,
  )
  if (match) {
    SUPPORTED_LOCALES = JSON.parse(match[1].replace(/'/g, '"'))
  }
} catch {
  console.error(
    'Failed to load SUPPORTED_LOCALES from constants file, using fallback',
  )
}

if (!SUPPORTED_LOCALES) {
  console.warn('Using hardcoded SUPPORTED_LOCALES fallback')
  SUPPORTED_LOCALES = ['en', 'fr', 'de', 'es', 'nl']
}

async function fetchWithRedirect(url, options = {}) {
  const response = await fetch(url, {
    redirect: 'manual', // Don't follow redirects automatically
    ...options,
  })

  return {
    url,
    status: response.status,
    location: response.headers.get('location'),
    redirected: response.status >= 300 && response.status < 400,
    ok: response.ok,
    text: await response.text(),
  }
}

async function testRedirect(from, to, expectedStatus = 308, description = '') {
  const testDesc = description ? ` (${description})` : ''
  console.log(`Testing: ${from} -> ${to}${testDesc}`)

  const result = await fetchWithRedirect(`${BASE_URL}${from}`)

  if (result.status !== expectedStatus) {
    console.error(`❌ Expected status ${expectedStatus}, got ${result.status}`)
    return false
  }

  if (result.location !== `${BASE_URL}${to}`) {
    console.error(
      `❌ Expected redirect to ${BASE_URL}${to}, got ${result.location}`,
    )
    return false
  }

  console.log(`✅ Redirected correctly (${expectedStatus})`)
  return true
}

async function testCanonicalPage(url) {
  console.log(`Testing canonical page: ${url}`)

  const result = await fetchWithRedirect(`${BASE_URL}${url}`)

  if (result.status !== 200) {
    console.error(`❌ Expected status 200, got ${result.status}`)
    return false
  }

  // Check for canonical link in HTML
  const canonicalMatch = result.text.match(
    /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/,
  )
  if (!canonicalMatch) {
    console.error(`❌ No canonical link found in HTML`)
    return false
  }

  const canonicalUrl = canonicalMatch[1]

  // Extract the path from the canonical URL (handle both absolute and relative URLs)
  let canonicalPath
  try {
    const canonicalUrlObj = new URL(canonicalUrl, BASE_URL)
    canonicalPath = canonicalUrlObj.pathname
  } catch {
    // If parsing fails, assume it's a relative path
    canonicalPath = canonicalUrl.startsWith('/')
      ? canonicalUrl
      : `/${canonicalUrl}`
  }

  // Verify the canonical path matches the expected /en/legal/* pattern
  const expectedPath = url // url is already the canonical path like '/en/legal/terms-of-use'
  if (canonicalPath !== expectedPath) {
    console.error(
      `❌ Expected canonical path ${expectedPath}, got ${canonicalPath} (from ${canonicalUrl})`,
    )
    return false
  }

  console.log(`✅ Page loads (200) with correct canonical link`)
  return true
}

async function runTests() {
  console.log('🧪 Testing legal page SEO canonicalization...\n')
  console.log(`📍 Base URL: ${BASE_URL}`)
  console.log(`🌍 Supported locales: ${SUPPORTED_LOCALES.join(', ')}`)
  console.log(
    `🌍 Non-English locales for testing: ${SUPPORTED_LOCALES.filter(locale => locale !== 'en').join(', ')}\n`,
  )

  let allPassed = true

  // Test bare legal URLs redirect to /en/legal/*
  console.log('1. Testing bare legal URLs:')
  allPassed =
    allPassed &&
    (await testRedirect('/legal/terms-of-use', '/en/legal/terms-of-use'))
  allPassed =
    allPassed &&
    (await testRedirect(
      '/legal/terms-of-use/',
      '/en/legal/terms-of-use',
      308,
      'trailing slash normalized',
    ))
  allPassed =
    allPassed &&
    (await testRedirect('/legal/privacy-policy', '/en/legal/privacy-policy'))
  allPassed =
    allPassed &&
    (await testRedirect(
      '/legal/privacy-policy/',
      '/en/legal/privacy-policy',
      308,
      'trailing slash normalized',
    ))

  // Test query parameter preservation
  allPassed =
    allPassed &&
    (await testRedirect(
      '/legal/terms-of-use?utm=test',
      '/en/legal/terms-of-use?utm=test',
      308,
      'query params preserved',
    ))
  allPassed =
    allPassed &&
    (await testRedirect(
      '/legal/terms-of-use/?utm=test&ref=example',
      '/en/legal/terms-of-use?utm=test&ref=example',
      308,
      'multiple query params preserved',
    ))

  console.log('\n2. Testing locale-specific legal URLs:')
  // Test locale-specific legal URLs redirect to /en/legal/*
  const nonEnglishLocales = SUPPORTED_LOCALES.filter(locale => locale !== 'en')
  for (const locale of nonEnglishLocales) {
    allPassed =
      allPassed &&
      (await testRedirect(
        `/${locale}/legal/terms-of-use`,
        '/en/legal/terms-of-use',
      ))
    allPassed =
      allPassed &&
      (await testRedirect(
        `/${locale}/legal/terms-of-use/`,
        '/en/legal/terms-of-use',
        308,
        `trailing slash normalized for ${locale}`,
      ))
    allPassed =
      allPassed &&
      (await testRedirect(
        `/${locale}/legal/privacy-policy`,
        '/en/legal/privacy-policy',
      ))
    allPassed =
      allPassed &&
      (await testRedirect(
        `/${locale}/legal/privacy-policy/`,
        '/en/legal/privacy-policy',
        308,
        `trailing slash normalized for ${locale}`,
      ))
    allPassed =
      allPassed &&
      (await testRedirect(
        `/${locale}/legal/terms-of-use?utm=test`,
        '/en/legal/terms-of-use?utm=test',
        308,
        `query params preserved for ${locale}`,
      ))
  }

  console.log('\n3. Testing canonical pages load correctly:')
  // Test canonical pages return 200 and have canonical metadata
  allPassed &= await testCanonicalPage('/en/legal/terms-of-use')
  allPassed &= await testCanonicalPage('/en/legal/privacy-policy')

  console.log('\n' + '='.repeat(50))

  if (allPassed) {
    console.log('🎉 All tests passed!')
    process.exit(0)
  } else {
    console.log('💥 Some tests failed!')
    process.exit(1)
  }
}

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(error => {
    console.error('Test runner failed:', error)
    process.exit(1)
  })
}

export { runTests, testRedirect, testCanonicalPage }

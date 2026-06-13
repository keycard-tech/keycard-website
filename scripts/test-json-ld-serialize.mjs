import assert from 'node:assert/strict'

/** Keep in sync with src/app/_components/json-ld.tsx */
function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

const payload = {
  headline:
    '</script><script>window.__jsonld_xss=1;document.body.setAttribute("data-pwned","jsonld")</script>',
}

const serialized = serializeJsonLd(payload)

assert.doesNotMatch(
  serialized,
  /<\/script>/i,
  'serialized JSON-LD must not contain </script>',
)
assert.ok(
  serialized.includes('\\u003c'),
  'angle brackets must be unicode-escaped',
)

const parsed = JSON.parse(serialized)
assert.equal(
  parsed.headline,
  payload.headline,
  'JSON-LD content must round-trip after parsing',
)

console.log('serializeJsonLd: ok')

import test from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_IS_LAUNCHED, isIndexingEnabled, parseSiteUrl } from './seo-config.js'

const srcDir = fileURLToPath(new URL('..', import.meta.url))

test('site url is only accepted as an absolute http(s) origin', () => {
  assert.equal(parseSiteUrl(undefined), undefined)
  assert.equal(parseSiteUrl(''), undefined)
  assert.equal(parseSiteUrl('pawlystudios.vercel.app'), undefined)
  assert.equal(parseSiteUrl('not a url'), undefined)
  assert.equal(parseSiteUrl('ftp://example.com'), undefined)
  assert.equal(parseSiteUrl('javascript:alert(1)'), undefined)
  assert.equal(parseSiteUrl('https://example.com/path/?q=1#h'), 'https://example.com')
})

test('indexing needs both the launch flag and a valid site url', () => {
  const valid = parseSiteUrl('https://example.com')
  assert.equal(isIndexingEnabled({ isLaunched: true, siteUrl: valid }), true)
  assert.equal(isIndexingEnabled({ isLaunched: false, siteUrl: valid }), false)
  assert.equal(isIndexingEnabled({ isLaunched: false, siteUrl: undefined }), false)
})

test('launched with a missing or malformed site url can never be indexable', () => {
  for (const raw of [undefined, '', 'pawlystudios.vercel.app', 'not a url', 'ftp://example.com', 'javascript:alert(1)']) {
    assert.equal(isIndexingEnabled({ isLaunched: true, siteUrl: parseSiteUrl(raw) }), false, `raw=${raw}`)
  }
})

test('only a boolean true launch flag can enable indexing', () => {
  const valid = parseSiteUrl('https://example.com')
  for (const flag of [undefined, null, 'true', 1, 'yes']) {
    assert.equal(isIndexingEnabled({ isLaunched: flag, siteUrl: valid }), false)
  }
})

test('robots.txt and sitemap follow the derived indexing state for any site url', () => {
  const run = (url) =>
    JSON.parse(
      execFileSync(
        process.execPath,
        [
          '--input-type=module',
          '-e',
          `const { default: robots } = await import('./src/app/robots.js')
           const { default: sitemap } = await import('./src/app/sitemap.js')
           console.log(JSON.stringify({ robots: robots(), sitemap: sitemap() }))`,
        ],
        { cwd: join(srcDir, '..'), env: { ...process.env, NEXT_PUBLIC_SITE_URL: url }, encoding: 'utf8' },
      ),
    )

  const origin = 'https://example.com'
  const valid = run(origin)
  if (SITE_IS_LAUNCHED) {
    assert.deepEqual(valid.robots, { rules: { userAgent: '*', allow: '/' }, sitemap: `${origin}/sitemap.xml` })
    assert.equal(valid.sitemap.length, 5)
  } else {
    assert.deepEqual(valid.robots, { rules: { userAgent: '*', disallow: '/' } })
    assert.deepEqual(valid.sitemap, [])
  }

  // Whatever the launch flag says, a missing or malformed url never opens the site.
  for (const url of ['', 'not a url', 'pawlystudios.vercel.app']) {
    const closed = run(url)
    assert.deepEqual(closed.robots, { rules: { userAgent: '*', disallow: '/' } }, `url=${url}`)
    assert.deepEqual(closed.sitemap, [], `url=${url}`)
  }
})

test('no source file reads the launch flag except through the derived indexing state', () => {
  const offenders = []
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name)
      if (statSync(path).isDirectory()) walk(path)
      else if (/\.(js|jsx)$/.test(name) && !name.endsWith('.test.js') && !path.endsWith('lib/seo-config.js')) {
        if (/^import\s[^\n]*SITE_IS_LAUNCHED/m.test(readFileSync(path, 'utf8'))) offenders.push(path)
      }
    }
  }
  walk(srcDir)
  assert.deepEqual(offenders, [])
})

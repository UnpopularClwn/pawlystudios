import test from 'node:test'
import assert from 'node:assert/strict'
import { buildPageSchema, serializeJsonLd, SCHEMA_ROUTES } from './schema.js'

const origin = 'https://example.com'
const build = (route, overrides = {}) =>
  buildPageSchema({ siteUrl: origin, isLaunched: true, route, title: 'T', description: 'D', ...overrides })
const types = (schema) => schema['@graph'].map((node) => node['@type'])

test('schema stays unpublished until launch with a valid site origin', () => {
  assert.equal(build('home', { siteUrl: undefined, isLaunched: false }), null)
  assert.equal(build('home', { isLaunched: false }), null)
  assert.equal(build('home', { siteUrl: undefined }), null)
  assert.equal(build('unknown'), null)
})

test('every route shares one person, brand and website with stable ids', () => {
  for (const route of Object.keys(SCHEMA_ROUTES)) {
    const graph = build(route)['@graph']
    const byType = (type) => graph.filter((node) => node['@type'] === type)
    assert.equal(byType('Person').length, 1)
    assert.equal(byType('Brand').length, 1)
    assert.equal(byType('WebSite').length, 1)
    assert.equal(byType('Person')[0]['@id'], `${origin}/#paul-cabiles`)
    assert.equal(byType('Person')[0].name, 'Niño Paul Cabiles')
    assert.equal(byType('Brand')[0].name, 'pawlystudios.')
    assert.equal(new Set(graph.map((node) => node['@id'])).size, graph.length)
    assert.equal(types({ '@graph': graph }).includes('ProfessionalService'), false)
    assert.equal(types({ '@graph': graph }).includes('LocalBusiness'), false)
  }
})

test('page nodes use the canonical url and the right page type', () => {
  const page = (route) => build(route)['@graph'].find((node) => node['@id'].endsWith('#webpage'))
  assert.equal(page('home')['@type'], 'WebPage')
  assert.equal(page('home').url, origin)
  assert.equal(page('about')['@type'], 'AboutPage')
  assert.equal(page('about').url, `${origin}/about`)
  assert.equal(page('contact')['@type'], 'ContactPage')
  assert.equal(page('setsail')['@type'], 'WebPage')
  assert.equal(page('setsail').url, `${origin}/work/setsail`)
})

test('web development page carries the service and a breadcrumb to real urls only', () => {
  const graph = build('webDevelopment')['@graph']
  const service = graph.find((node) => node['@type'] === 'Service')
  assert.equal(service.provider['@id'], `${origin}/#paul-cabiles`)
  const crumbs = graph.find((node) => node['@type'] === 'BreadcrumbList').itemListElement
  assert.deepEqual(crumbs.map((item) => item.item), [origin, `${origin}/services/web-development`])
})

test('setsail is a plain page about the work, with no software or offer fields', () => {
  const graph = build('setsail')['@graph']
  assert.equal(graph.some((node) => ['SoftwareApplication', 'WebApplication', 'Service', 'CreativeWork'].includes(node['@type'])), false)
  const crumbs = graph.find((node) => node['@type'] === 'BreadcrumbList').itemListElement
  assert.deepEqual(crumbs.map((item) => item.item), [origin, `${origin}/work/setsail`])
})

test('home, about and contact have no breadcrumb or service nodes', () => {
  for (const route of ['home', 'about', 'contact']) {
    const found = types(build(route))
    assert.equal(found.includes('BreadcrumbList'), false)
    assert.equal(found.includes('Service'), false)
  }
})

test('resume is a profile page about the person, with a breadcrumb to real urls only', () => {
  const graph = build('resume')['@graph']
  const page = graph.find((node) => node['@id'].endsWith('#webpage'))
  assert.equal(page['@type'], 'ProfilePage')
  assert.equal(page.url, `${origin}/resume`)
  assert.equal(page.mainEntity['@id'], `${origin}/#paul-cabiles`)
  const crumbs = graph.find((node) => node['@type'] === 'BreadcrumbList').itemListElement
  assert.deepEqual(crumbs.map((item) => item.item), [origin, `${origin}/resume`])
})

test('serialized json-ld cannot close its script tag', () => {
  assert.equal(serializeJsonLd({ value: '</script>' }).includes('</script>'), false)
})

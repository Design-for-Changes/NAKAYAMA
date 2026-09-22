import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const output = path.resolve(fileURLToPath(new URL('../dist/', import.meta.url)))
const html = await readFile(path.join(output, 'index.html'), 'utf8')
assert(!html.includes('%BASE_URL%'), 'Production HTML contains an unexpanded Vite placeholder')
assert(!/\/src\/[^"']+\.[jt]sx?/.test(html), 'Production HTML references development source')
const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map((match) => match[1])
assert(scripts.length > 0, 'Production HTML has no JavaScript entry')
const assets = [...html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)].map((match) => match[1])
for (const asset of assets) {
  assert(asset.startsWith('/NAKAYAMA/'), `Incorrect Pages base: ${asset}`)
  const target = path.resolve(output, asset.slice('/NAKAYAMA/'.length))
  assert(target.startsWith(output + path.sep), `Asset escapes output directory: ${asset}`)
  assert((await stat(target)).isFile(), `Missing built asset: ${asset}`)
}
console.log(`Production entry verified: ${assets.length} local assets, correct Pages base, no development source`)

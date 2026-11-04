import { writeFileSync } from 'fs'
import globby from 'globby'
import siteMetadata from '../data/siteMetadata.js'
import { allBlogs } from '../.contentlayer/generated/index.mjs'

// Inlined from pliny 0.0.10's generateSitemap; pliny 0.4 dropped it.
const sitemap = async () => {
  const contentPages = allBlogs
    .filter((x) => !x.draft && !x.canonicalUrl)
    .map((x) => `/${x._raw.flattenedPath}`)
  const pages = await globby([
    'pages/*.(js|tsx)',
    'public/tags/**/*.xml',
    '!pages/_*.(js|tsx)',
    '!pages/api',
    '!pages/404.(js|tsx)',
  ])
  const urls = pages
    .concat(contentPages)
    .map((page) => {
      const route = page
        .replace('pages/', '/')
        .replace('public/', '/')
        .replace(/\.js|.tsx|.mdx|.md[^/.]+$/, '')
        .replace('/feed.xml', '')
      return `  <url>\n    <loc>${siteMetadata.siteUrl}${route === '/index' ? '' : route}</loc>\n  </url>`
    })
    .join('\n')
  writeFileSync(
    'public/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  )
  console.log('Sitemap generated...')
}
export default sitemap

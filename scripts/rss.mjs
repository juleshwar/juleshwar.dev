import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { slug } from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { getAllTags } from '../lib/tags.mjs'

// Inlined from pliny 0.0.10's generateRSS; pliny 0.4 dropped it.
const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}/blog/${post.slug}</link>
    ${post.summary ? `<description>${escape(post.summary)}</description>` : ''}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post.tags ? post.tags.map((t) => `<category>${t}</category>`).join('') : ''}
  </item>
`

const generateRss = (config, posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}/blog</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join('')}
    </channel>
  </rss>
`

const rss = () => {
  const publishPosts = allBlogs
    .filter((post) => post.draft !== true)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
  if (publishPosts.length === 0) return
  writeFileSync('./public/feed.xml', generateRss(siteMetadata, publishPosts))
  for (const tag of Object.keys(getAllTags(publishPosts))) {
    const filteredPosts = publishPosts.filter((post) =>
      post.tags?.map((t) => slug(t)).includes(tag)
    )
    const rssPath = path.join('public', 'tags', tag)
    mkdirSync(rssPath, { recursive: true })
    writeFileSync(
      path.join(rssPath, 'feed.xml'),
      generateRss(siteMetadata, filteredPosts, `tags/${tag}/feed.xml`)
    )
  }
  console.log('RSS feed generated...')
}
export default rss

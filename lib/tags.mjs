import { slug } from 'github-slugger'

// Inlined from pliny 0.0.10; pliny 0.4 dropped getAllTags.
/** @returns {Record<string, number>} */
export function getAllTags(allBlogs) {
  const tagCount = {}
  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        tagCount[formattedTag] = (tagCount[formattedTag] || 0) + 1
      })
    }
  })
  return tagCount
}

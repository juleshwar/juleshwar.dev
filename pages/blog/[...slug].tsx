import { MDXLayoutRenderer } from 'pliny/mdx-components'
import PageTitle from '@/components/PageTitle'
import { MDXComponents } from '@/components/MDXComponents'
import { sortedBlogPost, coreContent } from 'pliny/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Blog } from 'contentlayer/generated'
import PostLayout from '@/layouts/PostLayout'
import PostSimple from '@/layouts/PostSimple'

const DEFAULT_LAYOUT = 'PostLayout'
const layouts = { PostLayout, PostSimple }

export async function getStaticPaths() {
  return {
    paths: allBlogs
      .filter((p) => process.env.NODE_ENV !== 'production' || !p.draft)
      .map((p) => ({ params: { slug: p.slug.split('/') } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const slug = (params.slug as string[]).join('/')
  const sortedPosts = sortedBlogPost(allBlogs) as Blog[]
  const postIndex = sortedPosts.findIndex((p) => p.slug === slug)
  const prevContent = sortedPosts[postIndex + 1] || null
  const prev = prevContent ? coreContent(prevContent) : null
  const nextContent = sortedPosts[postIndex - 1] || null
  const next = nextContent ? coreContent(nextContent) : null
  const post = sortedPosts.find((p) => p.slug === slug)
  if (!post || (process.env.NODE_ENV === 'production' && post.draft)) {
    return { notFound: true }
  }
  const authorList = post.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults)
  })

  return {
    props: {
      post,
      authorDetails,
      prev,
      next,
    },
  }
}

export default function BlogPostPage({
  post,
  authorDetails,
  prev,
  next,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Layout = layouts[post.layout || DEFAULT_LAYOUT]
  return (
    <>
      {'draft' in post && post.draft === true ? (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      ) : (
        <Layout content={coreContent(post)} authorDetails={authorDetails} prev={prev} next={next}>
          <MDXLayoutRenderer code={post.body.code} components={MDXComponents} toc={post.toc} />
        </Layout>
      )}
    </>
  )
}

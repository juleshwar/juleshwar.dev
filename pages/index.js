import DefaultLayout from '@layouts/default'
import Link from 'next/link'
import { getConfig, getAllPosts } from '@api'

export default function Blog(props) {
    return (
        <DefaultLayout title={props.title} description={props.description}>
            <p>List of posts:</p>
            <ul>
                {props.posts.map(function (post, idx) {
                    return (
                        <li key={post.slug}>
                            <Link href={'/posts/' + post.slug}>
                                <a>{post.title}</a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </DefaultLayout>
    )
}

export async function getStaticProps() {
    const config = await getConfig()
    const allPosts = await getAllPosts()
    return {
        props: {
            posts: allPosts,
            title: config.site.title,
            description: config.site.description
        }
    }
}
import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents as MDXComponentsType } from 'mdx/types'

import Image from './Image'
import CustomLink from './Link'
import { Aside } from './Aside'

export const MDXComponents: MDXComponentsType = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm,
  Aside,
}

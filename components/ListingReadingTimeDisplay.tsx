import { MdOutlineAccessTime } from 'react-icons/md'

interface Props {
  readTime: number
}

export function ListingReadingTimeDisplay({ readTime }: Props) {
  return (
    <>
      <dt className="sr-only">Reading Time</dt>
      <dd className="flex items-center space-x-1 text-base leading-6 font-small text-gray-500 dark:text-gray-400">
        <MdOutlineAccessTime size={16} />
        <p>
          {readTime}
          {'m'}
        </p>
      </dd>
    </>
  )
}

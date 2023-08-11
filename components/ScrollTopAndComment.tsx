import siteMetadata from '@/data/siteMetadata'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from /* preval */ '../tailwind.config.js'

const ScrollTopAndComment = () => {
  const [show, setShow] = useState(false)
  const [scrollYValue, setScrollYValue] = useState(0)
  const [scrollableHeight, setScrollableHeight] = useState(100)
  const scrollYPercentage = Math.round((scrollYValue / scrollableHeight) * 100)
  const scrollYInDegrees = scrollYPercentage * 3.6 // Each percentage === 3.6 degrees movement
  const { theme, resolvedTheme } = useTheme()
  const isDarkTheme = theme === 'dark' || resolvedTheme === 'dark'
  const { theme: tailwindTheme } = resolveConfig(tailwindConfig)

  useEffect(() => {
    // Deducting the visible viewport height
    setScrollableHeight(document.body.scrollHeight - window.innerHeight)
  }, [])

  useEffect(() => {
    const handleWindowScroll = () => {
      const scrollY = window.scrollY
      setScrollYValue(scrollY)
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }
  const handleScrollToComment = () => {
    document.getElementById('comment').scrollIntoView()
  }

  const conicColor = isDarkTheme
    ? tailwindTheme.colors.primary['400']
    : tailwindTheme.colors.primary['600']
  const scrollTopButtonCssBackgroundRules = {
    default: `conic-gradient(${conicColor} ${scrollYInDegrees}deg, transparent 0deg)`,
    dank: `conic-gradient(red, orange, yellow, green, blue, red, transparent ${
      scrollYInDegrees + 30
    }deg)`,
  }

  return (
    <div
      className={`fixed right-8 bottom-8 hidden flex-col gap-3 ${show ? 'md:flex' : 'md:hidden'}`}
    >
      {siteMetadata.comments.provider && (
        <button
          aria-label="Scroll To Comment"
          onClick={handleScrollToComment}
          className="m-1 rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      <div
        style={{ background: scrollTopButtonCssBackgroundRules.default }}
        className="rounded-full"
      >
        <button
          aria-label="Scroll To Top"
          onClick={handleScrollTop}
          className="m-1 rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ScrollTopAndComment

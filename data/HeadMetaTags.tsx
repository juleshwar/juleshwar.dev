const LinkPreviewMetaTags = () => {
  return (
    <>
      {/* Generated using https://metatags.io/ */}
      {/* Primary Meta Tags */}
      <title> juleshwar.dev</title>
      <meta name="title" content="juleshwar.dev" />
      <meta
        name="description"
        content="My ramblings about Software Development, Tech, Coffee, Life and more..."
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://juleshwar.dev/" />
      <meta property="og:title" content="juleshwar.dev" />
      <meta
        property="og:description"
        content="My ramblings about Software Development, Tech, Coffee, Life and more..."
      />
      <meta property="og:image" content="https://juleshwar.dev/static/images/twitter-card.png" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://juleshwar.dev/" />
      <meta property="twitter:title" content="juleshwar.dev" />
      <meta
        property="twitter:description"
        content="My ramblings about Software Development, Tech, Coffee, Life and more..."
      />
      <meta
        property="twitter:image"
        content="https://juleshwar.dev/static/images/twitter-card.png"
      />
    </>
  )
}

const HeadMetaTags = () => {
  return (
    <>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <LinkPreviewMetaTags />
    </>
  )
}

export { HeadMetaTags }

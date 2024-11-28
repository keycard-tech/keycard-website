type Props = {
  mp4Src: string
  webmSrc: string
  ariaLabel: string
}

const Video = (props: Props) => {
  const { mp4Src, webmSrc, ariaLabel } = props

  return (
    <video
      className="aspect-[0.79] w-full rounded-28 border border-white-12 object-cover md:aspect-[1.88]"
      autoPlay
      loop
      playsInline
      muted
      aria-label={ariaLabel}
    >
      <source src={mp4Src} type="video/mp4" />
      <source src={webmSrc} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  )
}

export { Video }

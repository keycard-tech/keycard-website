import NextImage, { ImageProps } from 'next/image'

export const Image = (props: ImageProps) => {
  return <NextImage quality={100} {...props} />
}

import { Image } from '~components/image'

type Props = {
  variant: 'thank-you' | 'homepage'
}

export const BackgroundImage = (props: Props) => {
  const { variant } = props

  return (
    <div className="absolute size-full translate-y-[20px]">
      <Image
        src={
          variant === 'homepage'
            ? '/assets/placeholder.png'
            : '/assets/placeholder-thank-you.png'
        }
        alt="Keycard background"
        width={5478}
        height={2166}
        className="aspect-[5478/2166] h-[74.5%] w-full object-cover"
      />
    </div>
  )
}

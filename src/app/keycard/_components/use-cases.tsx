import { Button } from '~components/button'
import { BuyKeycardDialog } from '~components/buy-keycard-dialog'
import { Recommended } from '~icons'
import { cx } from 'cva'
import Image from 'next/image'
import { Card } from './card'
import { LinearGradientMobile } from './linear-gradients'

const cardSets = [
  { count: 3, price: 64, recommended: true },
  { count: 2, price: 48 },
  { count: 1, price: 25 },
]

const useCases = [
  {
    name: 'Vault',
    description: 'Your most precious tokens in a single card',
    cardClassName: 'z-20',
    cardClassNameMobile: 'z-20',
    captionClassName:
      'right-1/2 -translate-x-20 xl:-translate-x-1/3  top-[92px]',
  },
  {
    name: 'Backup',
    description: 'Never worry about losing your Keycards',
    cardClassName: 'z-10 -mt-36',
    cardClassNameMobile: 'z-10',
    captionClassName: 'left-1/2 translate-x-36 xl:translate-x-1/3 top-10',
    inverted: true,
  },
  {
    name: 'Memecoins',
    description: 'Have peace of mind trading memecoins',
    cardClassName: '-mt-40',
    cardClassNameMobile: '',
    captionClassName:
      'right-1/2 -translate-x-20 xl:-translate-x-1/3 top-[92px]',
  },
]

const UseCases = () => {
  return (
    <div className="pt-[120px] text-white-95 lg:pt-[200px]">
      <div className="px-3 lg:text-center">
        <div>
          <h2 className="mb-1 font-lora text-32 font-400">
            Many use cases, multiple Keycards
          </h2>
          <p className="max-w-[549px] pb-8 text-20 font-300 text-white-60 lg:mx-auto">
            By having different Keycards you can store your most valuable card
            at home while taking your hot wallet with you.
          </p>
          <BuyKeycardDialog>
            <Button variant="primary">Buy Keycard</Button>
          </BuyKeycardDialog>
        </div>

        <div className="flex justify-start gap-3 py-14 lg:justify-center lg:pb-20">
          {cardSets.map((set, index) => (
            <div
              key={index}
              className="flex w-40 flex-col justify-between rounded-20 border border-white-12 bg-white-3 px-4 py-3"
            >
              <span className="font-300 text-white-60">
                {set.count} card set
              </span>
              <div className="flex w-full items-center justify-between font-lora text-24 font-400">
                ${set.price}
                {set.recommended && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-orange">
                    <Recommended />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="relative hidden lg:block">
          {useCases.map((useCase, index) => (
            <Card key={index} data={useCase} />
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="block lg:hidden">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={cx([
                'relative mb-8 flex items-start first:mt-20',
                useCase.cardClassNameMobile,
              ])}
            >
              <div className="relative z-20 w-full">
                <div className="flex flex-col items-start text-left">
                  <h3 className="font-lora text-24 font-500">{useCase.name}</h3>
                  <p className="max-w-[200px] text-16 text-white-60">
                    {useCase.description}
                  </p>
                </div>
                <div className="z-50 flex items-center pr-28">
                  <LinearGradientMobile />
                  <div className="size-6 shrink-0 rounded-full border border-white-95" />
                </div>
              </div>
              <div className="absolute right-0 z-[-1] -mt-8 w-[450px] -translate-y-12 translate-x-[60%] drop-shadow-[0_35px_35px_rgba(0,0,0,0.65)]">
                <Image
                  src="/assets/keycard/card.png"
                  alt={`Keycard for ${useCase.name}`}
                  width={450}
                  height={277}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { UseCases }

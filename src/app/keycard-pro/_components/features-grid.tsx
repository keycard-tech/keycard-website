import { Tag } from '~components/tag'
import { Tooltip } from '~components/tooltip'
import { cx } from 'cva'
import Image from 'next/image'

// TODO: Replace wallet icons with correct images and names when design has them.
const features = [
  {
    title: 'Runs forever',
    description:
      'With the use of a very common replaceable Nokia BL-4C battery.',
    image: '/assets/keycard-pro/keycard-pro-feature-1.png',
    badge: { text: '18 hours+' },
    className: 'row-span-2 col-span-1 [&_img]:w-fit gap-0',
  },
  {
    title: 'Ethereum support',
    description:
      'Something here about how it’s really super cool and a great feature.',
    className: 'col-span-1',
    icons: [
      {
        name: 'Metamask',
        image: '/assets/keycard-pro/wallets/metamask.png',
      },
      {
        name: 'Rabbit',
        image: '/assets/keycard-pro/wallets/rabby.png',
      },
      {
        name: 'Bird',
        image: '/assets/keycard-pro/wallets/bird-wallet.png',
      },
      {
        name: 'ImToken',
        image: '/assets/keycard-pro/wallets/imtoken.png',
      },
    ],
  },
  {
    title: 'Large screen',
    description:
      'Something here about how it’s really super cool and a great feature.',
    image: '/assets/keycard-pro/keycard-pro-feature-2.png',
    badge: { text: '2 inches' },
    className: 'row-span-2 col-span-1 flex-col-reverse gap-0',
  },
  {
    title: 'Something',
    description:
      'Something here about how it’s really super cool and a great feature.',
    badge: { text: 'Amazing' },
    className: 'col-span-1',
  },
  {
    title: 'Something',
    description:
      'Something here about how it’s really super cool and a great feature.',
    badge: { text: 'Super' },
    className: 'col-span-1',
  },
  {
    title: 'Bitcoin support',
    description:
      'Something here about how it’s really super cool and a great feature.',
    className: 'col-span-1',
    icons: [
      {
        name: 'Backpack',
        image: '/assets/keycard-pro/wallets/backpack.png',
      },
      {
        name: 'Blue',
        image: '/assets/keycard-pro/wallets/blue-wallet.png',
      },
      {
        name: 'Safe pale',
        image: '/assets/keycard-pro/wallets/safepal.png',
      },
      {
        name: 'Phantom',
        image: '/assets/keycard-pro/wallets/phantom.png',
      },
    ],
  },
]

const FeaturesGrid = () => {
  return (
    <section className="mx-auto max-w-[1352px] pt-[200px]">
      <h1 className="max-w-[665px] font-lora text-32 text-white-95">
        Convenient, robust and made to last
      </h1>
      <div className="grid grid-cols-4 gap-6 pt-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cx([
              'relative flex flex-col justify-between overflow-clip rounded-28 bg-white-3 outline outline-1 outline-white-8',
              feature.className,
            ])}
          >
            {feature.image && (
              <Image
                src={feature.image}
                alt={feature.title}
                className="w-full rounded-12"
                width={500}
                height={500}
              />
            )}

            <div className="p-6">
              <div>
                <h3 className="mb-[6px] font-lora text-24 font-400">
                  {feature.title}
                </h3>

                <p className="mb-6 text-16 font-300 text-white-60">
                  {feature.description}
                </p>

                {feature.badge && <Tag>{feature.badge.text}</Tag>}
                {feature.icons && (
                  <div className="flex items-center gap-3">
                    {feature.icons?.map((icon, index) => (
                      <Tooltip key={index} label={icon.name}>
                        <Image
                          src={icon.image}
                          alt={icon.name}
                          width={40}
                          height={40}
                        />
                      </Tooltip>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export { FeaturesGrid }

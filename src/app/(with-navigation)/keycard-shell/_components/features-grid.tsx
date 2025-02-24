import { Image } from '~components/image'
import { Tag } from '~components/tag'
import { Tooltip } from '~components/tooltip'
import { cx } from 'cva'

const features = [
  {
    title: 'Runs for ever',
    description:
      'With the use of a very common replaceable Nokia BL-4C battery.',
    image: '/assets/keycard-shell/keycard-shell-feature-1.png',
    badge: { text: '18 hours+' },
    className: 'row-span-2 col-span-1 [&_img]:w-fit gap-0',
  },
  {
    title: 'Ethereum support',
    description: 'Works out of the box with your favourite Ethereum wallets.',
    className: 'col-span-1',
    icons: [
      {
        name: 'Metamask',
        image: '/assets/keycard-shell/wallets/metamask.png',
      },
      {
        name: 'Rabbit',
        image: '/assets/keycard-shell/wallets/rabbit.png',
      },
      {
        name: 'imToken',
        image: '/assets/keycard-shell/wallets/im-token.png',
      },
      {
        name: 'Backpack',
        image: '/assets/keycard-shell/wallets/back-pack.png',
      },
    ],
  },
  {
    title: 'Large display',
    description:
      'Verify the correctness of transaction data on the secure device.',
    image: '/assets/keycard-shell/keycard-shell-feature-2.png',
    badge: { text: '2 inches' },
    className:
      'row-span-2 col-span-1 flex-col-reverse gap-0 [&_img]:scale-75 lg:scale-100',
  },
  {
    title: 'Air-gapped',
    description:
      'Send transactions through the air via QR code standard ERC-4527.',
    badge: { text: 'ERC-4527' },
    className: 'col-span-1',
  },
  {
    title: 'Easy to backup',
    description:
      'Use multiple cards as backups, each protected by a unique PIN.',
    badge: { text: '2 cards included with device' },
    className: 'col-span-1',
  },
  {
    title: 'Bitcoin support',
    description:
      'Something here about how it’s really super cool and a great feature.',
    className: 'col-span-1',
    icons: [
      {
        name: 'Unisat',
        image: '/assets/keycard-shell/wallets/uni-sat.png',
      },
      {
        name: 'Sparrow',
        image: '/assets/keycard-shell/wallets/sparrow.png',
      },
      {
        name: 'Specter',
        image: '/assets/keycard-shell/wallets/specter.png',
      },
      {
        name: 'Blue',
        image: '/assets/keycard-shell/wallets/blue.png',
      },
    ],
  },
]

const FeaturesGrid = () => {
  return (
    <section className="max-w-[1352px] px-3 pt-[120px] lg:mx-auto lg:pt-[200px] min-[1512px]:px-0">
      <h2 className="max-w-[665px] font-lora text-32 text-white-95">
        Convenient, secure and made to last
      </h2>
      <div className="grid grid-cols-1 gap-5 pt-14 lg:grid-cols-4 lg:gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cx([
              'relative flex flex-col justify-between overflow-clip rounded-28 bg-white-4 outline outline-1 outline-white-8',
              feature.className,
            ])}
          >
            {feature.image && (
              <Image
                src={feature.image}
                alt={feature.title}
                className="w-full rounded-12"
                width={640}
                height={640}
              />
            )}
            <div className="p-6 pt-5">
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
                          className="transition-opacity duration-200 hover:opacity-[80%]"
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

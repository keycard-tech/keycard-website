import { ButtonLink } from '~components/button-link'
import { Tag } from '~components/tag'
import { Tooltip } from '~components/tooltip'
import { Github, Shield } from '~icons'
import { cx } from 'cva'
import Image from 'next/image'
import { createElement } from 'react'

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
    description: 'Works out of the box with your favourite Ethereum wallets.',
    className: 'col-span-1',
    icons: [
      {
        name: 'Metamask',
        image: '/assets/keycard-pro/wallets/metamask.png',
      },
      {
        name: 'Rabbit',
        image: '/assets/keycard-pro/wallets/rabbit.png',
      },
      {
        name: 'imToken',
        image: '/assets/keycard-pro/wallets/im-token.png',
      },
      {
        name: 'Backpack',
        image: '/assets/keycard-pro/wallets/back-pack.png',
      },
    ],
  },
  {
    title: 'Large display',
    description:
      'Enjoy full visibility of sensitive information like your seed phrase.',
    image: '/assets/keycard-pro/keycard-pro-feature-2.png',
    badge: { text: '2 inches' },
    className: 'row-span-2 col-span-1 flex-col-reverse gap-0',
  },
  {
    title: 'Open source security',
    description:
      'Our software, hardware and construction is fully open source.',
    button: { icon: Github, text: 'View on GitHub' },
    className: 'col-span-1',
  },
  {
    title: 'Unparalleled security',
    description:
      'Keycard’s secure element has passed Common Criteria EAL6+ certification.',
    badge: { icon: Shield, text: 'EAL 6+', gradient: true },
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
        image: '/assets/keycard-pro/wallets/uni-sat.png',
      },
      {
        name: 'Sparrow',
        image: '/assets/keycard-pro/wallets/sparrow.png',
      },
      {
        name: 'Specter',
        image: '/assets/keycard-pro/wallets/specter.png',
      },
      {
        name: 'Blue',
        image: '/assets/keycard-pro/wallets/blue.png',
      },
    ],
  },
]

const FeaturesGrid = () => {
  return (
    <section className="max-w-[1352px] px-3 pt-[120px] lg:mx-auto lg:pt-[200px] min-[1512px]:px-0">
      <h2 className="max-w-[665px] font-lora text-32 text-white-95">
        Convenient, robust and made to last
      </h2>
      <div className="grid grid-cols-1 gap-5 pt-14 lg:grid-cols-4 lg:gap-6">
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
                width={140}
                height={140}
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

                {feature.badge && (
                  <Tag
                    gradient={feature.badge.gradient}
                    icon={
                      feature.badge.icon && createElement(feature.badge.icon)
                    }
                  >
                    {feature.badge.text}
                  </Tag>
                )}
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
                {feature.button && (
                  <ButtonLink
                    href="https://github.com"
                    className="font-500 [&_path]:hover:fill-white-dark"
                    variant="white"
                    icon={<feature.button.icon />}
                  >
                    {feature.button.text}
                    <feature.button.icon />
                  </ButtonLink>
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

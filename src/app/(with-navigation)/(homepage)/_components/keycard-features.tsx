import { FirmwareIcon } from '@status-im/icons/20'
import { GithubIcon } from '@status-im/icons/social'
import { ButtonLink } from '~components/button-link'
import { Tag } from '~components/tag'
import { InfinityIcon } from '~icons/infinity'
import { cx } from 'cva'
import Image from 'next/image'
import { createElement } from 'react'

const features = [
  {
    title: 'Best in class security',
    description:
      'Our secure element has the highest level of security EAL6+ certified by Common Criteria.',
    image: '/assets/feature-keycard.png',
    imageClassName: '!justify-start',
    badge: { icon: FirmwareIcon, text: 'EAL 6+', gradient: true },
    className: 'row-span-2 col-span-1',
  },
  {
    title: '100% open source',
    description:
      'We have nothing to hide! Our software, hardware and construction is fully open source.',
    button: { icon: GithubIcon, text: 'View on GitHub' },
    className: 'col-span-1',
  },
  {
    title: 'Fully airgapped',
    description:
      "Through Keycard Shell's camera or Keycard's contactless nature, our products are truly airgapped.",
    image: '/assets/feature-keycard-shell.png',
    badge: { text: '0 cables' },
    className: 'row-span-2 col-span-1 flex-col-reverse',
  },
  {
    title: 'Made to last',
    description:
      'Your keycard has a life expectancy of 25+ years, resists water and dust. It will still securely store your keys.',
    badge: { text: '25+ years' },
    className: 'col-span-1',
  },
  {
    title: 'Easy to backup',
    description:
      'Create cards to back up your master key and store them in a safe place instead of the typical piece of paper.',
    badge: { icon: InfinityIcon, text: 'backups' },
    className: 'col-span-1',
  },
  {
    title: 'Discreet',
    description:
      'With its light, small and discreet form factor your Keycard can go unnoticed in your wallet.',
    badge: { text: 'Credit card format' },
    className: 'col-span-1',
  },
]

const UnderlinedWord = ({ children }: { children: React.ReactNode }) => (
  <div className="relative inline-block">
    <span className="relative z-10 [text-shadow:_-3px_2px_black,_4px_1px_black,_2px_0px_black,_3px_2px_black]">
      {children}
    </span>
    <div className="absolute bottom-1 left-0 -z-10 h-px w-full bg-orange" />
  </div>
)

const KeycardFeatures = () => {
  return (
    <section className="max-w-[1352px] px-3 pt-[120px] lg:mx-auto lg:pt-[200px] min-[1512px]:px-0">
      <h2 className="max-w-[665px] font-lora text-32 text-white-95">
        Join the <UnderlinedWord>open source</UnderlinedWord> revolution of the
        most <UnderlinedWord>modular</UnderlinedWord> and{' '}
        <UnderlinedWord>future proof</UnderlinedWord> hardware wallet system
        ever conceived.
      </h2>
      <div className="grid grid-cols-1 gap-5 pt-20 lg:grid-cols-4 lg:gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cx([
              'relative flex flex-col justify-between overflow-clip rounded-28 bg-white-4 outline outline-1 outline-white-8',
              feature.className,
            ])}
          >
            {feature.image && (
              <div
                className={cx([
                  'flex items-center justify-center',
                  feature.imageClassName,
                ])}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-12 object-cover"
                  width={500}
                  height={500}
                />
              </div>
            )}
            <div className="p-6 pt-5">
              <div>
                <h3 className="mb-[6px] font-lora text-24 font-400">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="mb-6 text-16 font-300 text-white-60">
                    {feature.description}
                  </p>
                )}
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
                {feature.button && (
                  <ButtonLink
                    href="https://github.com/status-im/status-keycard"
                    className="font-500 [&_path]:hover:fill-white-dark"
                    variant="white"
                    icon={<feature.button.icon />}
                  >
                    {feature.button.text}
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

export { KeycardFeatures }

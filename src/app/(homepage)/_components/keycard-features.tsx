import { ButtonLink } from '~components/button-link'
import { Tag } from '~components/tag'
import { Github, Infinity, Shield } from '~icons'
import { cx } from 'cva'
import Image from 'next/image'
import { createElement } from 'react'

const features = [
  {
    title: 'Best in class security',
    description:
      'Our secure element has the highest level of security EAL6+ certified by Common Criteria.',
    image: '/assets/feature-keycard.png',
    badge: { icon: Shield, text: 'EAL 6+', gradient: true },
    className: 'row-span-2 col-span-1',
  },
  {
    title: '100% open source',
    description:
      'We have nothing to hide! Our software, hardware and construction is fully open source.',
    button: { icon: Github, text: 'View on GitHub' },
    className: 'col-span-1',
  },
  {
    title: 'Fully airgapped',
    description:
      "Through KeyPro's camera or Keycard's contactless nature, our products are truly airgapped.",
    image: '/assets/feature-keycard-pro.png',
    badge: { text: '0 cables' },
    className: 'row-span-2 col-span-1 flex-col-reverse',
    gradient: true,
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
    badge: { icon: Infinity, text: 'backups' },
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
    <section className="max-w-[1352px] px-3 pt-[120px] lg:mx-auto lg:px-0 lg:pt-[200px]">
      <h1 className="max-w-[665px] font-lora text-32 text-white-95">
        Join the <UnderlinedWord>open source</UnderlinedWord> revolution of the
        most <UnderlinedWord>modular</UnderlinedWord> and{' '}
        <UnderlinedWord>future proof</UnderlinedWord> hardware wallet system
        ever conceived.
      </h1>
      <div className="grid grid-cols-1 gap-5 pt-20 lg:grid-cols-4 lg:gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cx([
              'relative flex flex-col justify-between overflow-clip rounded-28 bg-white-3 outline outline-1 outline-white-8',
              feature.className,
            ])}
          >
            {feature.image && (
              <div className={`flex items-center justify-center`}>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-12 object-cover"
                  width={500}
                  height={500}
                />
              </div>
            )}
            {feature.gradient && (
              <div className="absolute -bottom-10 left-0 h-1/2 w-full rounded-12 bg-gradient-to-b from-[transparent] to-white-8" />
            )}
            <div className="p-6">
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
                    href="https://github.com"
                    className="mt-4 font-500 [&_path]:hover:fill-white-dark"
                    variant="white"
                  >
                    <span>{feature.button.text}</span>
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

export { KeycardFeatures }

import { ButtonLink } from '~components/button-link'
import { Tag } from '~components/tag'
import { Github, Shield } from '~icons'

const features = [
  {
    name: 'Unparalleled security',
    description: `Keycard's secure element has passed Common Criteria's EAL6+ certification.`,
    badge: 'EAL 6+',
  },
  {
    name: 'Stateless',
    description: 'Your info and private keys are never stored on the device.',
    tags: ['Keys stored on Keycard'],
  },
  {
    name: 'Clear security model',
    description: `Your private keys will never leave Keycard's secure Element.`,
    tags: ['bip-32', 'bip-39', 'bip-44'],
  },
]

const FeaturesCard = () => {
  return (
    <section className="px-3 pt-20 lg:pt-0">
      <div className="grid grid-cols-1 gap-8 rounded-28 border border-white-8 bg-white-3 p-6 pt-5 text-white-95 lg:grid-cols-2 lg:gap-6 lg:p-8 lg:pt-7 xl:grid-cols-4">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="pb-[6px] font-lora text-24 font-400">
              {feature.name}
            </h3>

            <p className="pb-6 text-16 font-300 text-white-60">
              {feature.description}
            </p>

            {Boolean(feature.badge) && (
              <Tag gradient icon={<Shield />}>
                {feature.badge}
              </Tag>
            )}
            {feature.tags && (
              <div className="flex gap-2">
                {feature.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="pb-[6px] font-lora text-24 font-400 text-white-95">
              Open source security
            </h2>
            <p className="text-16 font-300 text-white-60">
              Our software, hardware and construction are fully open source.
            </p>
          </div>

          <ButtonLink
            href="https://github.com"
            className="font-500 [&_path]:hover:fill-white-dark"
            variant="white"
          >
            <span>View on Github</span>
            <Github />
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

export { FeaturesCard }

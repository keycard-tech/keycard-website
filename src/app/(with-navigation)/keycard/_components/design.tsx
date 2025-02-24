import { Image } from '~components/image'

const features = [
  {
    title: 'No battery',
    description: 'Always ready to tap, your Keycard will never let you down.',
    image: '/assets/keycard/no-battery.png',
  },
  {
    title: 'Resistant',
    description:
      'Resists high (50°) and low (-35°) temperatures, dust and X-rays.',
    image: '/assets/keycard/resistant.png',
  },
  {
    title: 'Discreet and light',
    description:
      'Carry Keycard in your wallet, no one will notice you hold crypto.',
    image: '/assets/keycard/discreet-light.png',
  },
  {
    title: 'Water resistant',
    description:
      'Resistant to most everyday spills, give it a wipe and you’re good to go.',
    image: '/assets/keycard/water-resistant.png',
  },
]

const Design = () => {
  return (
    <div className="px-3 pt-[120px] text-white-95 md:pt-[200px] lg:px-20">
      <div>
        <h2 className="pb-14 font-lora text-32 font-400">Simple by design</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col rounded-28 border border-white-8 bg-white-4 p-6"
            >
              <div className="text-12 font-400 text-white-80">0{index + 1}</div>
              <div className="translate-x-6 translate-y-[-20px] self-end pb-[6px]">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={160}
                  height={160}
                />
              </div>
              <h3 className="pb-2 font-lora text-24 font-400">
                {feature.title}
              </h3>
              <p className="text-16 font-300 text-white-60">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export { Design }

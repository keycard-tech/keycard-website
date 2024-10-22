const features = [
  {
    title: '100% open source',
    description: 'Our code is fully open source and audited by the community',
  },
  {
    title: 'Fully encrypted',
    description: 'Your data is encrypted and protected at all times',
  },
  {
    title: 'Made to last',
    description: 'Built with durable materials for long-lasting performance',
  },
]

export default function FeaturesSection() {
  return (
    <section className="px-6 py-16">
      <h2 className="mb-12 text-center text-48 font-500">
        Join the open source revolution
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="rounded-12 bg-white-6 p-6">
            <h3 className="mb-2 text-16 font-500">{feature.title}</h3>
            <p className="text-white-60">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

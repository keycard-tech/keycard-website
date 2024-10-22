const products = [
  { name: 'Keycard Pro', price: '$99', features: ['✓', '✓', '✓', '✓', '✓'] },
  { name: 'Keycard', price: '$59', features: ['✓', '✓', '✓', '✓', '✗'] },
  { name: 'Tangem', price: '$39', features: ['✓', '✓', '✗', '✗', '✗'] },
  { name: 'Ledger', price: '$59', features: ['✓', '✗', '✗', '✗', '✗'] },
]

const features = [
  'Compatible wallet',
  'Open source',
  'Removable seed protection',
  'Mobile friendly',
  'Easy back up of master keys',
]

export default function ComparisonTable() {
  return (
    <section className="px-6 py-16">
      <h2 className="mb-12 text-center text-48 font-500">
        Going one step further
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white-20">
              <th className="p-4 text-left">Features</th>
              {products.map((product, index) => (
                <th key={index} className="p-4 text-center">
                  {product.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="border-b border-white-8">
                <td className="p-4">{feature}</td>
                {products.map((product, productIndex) => (
                  <td key={productIndex} className="p-4 text-center">
                    {product.features[index] === '✓' ? (
                      <Check className="inline-block size-4 text-orange" />
                    ) : (
                      <X className="inline-block size-4 text-white-40" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-4 font-500">Price</td>
              {products.map((product, index) => (
                <td key={index} className="p-4 text-center font-500">
                  {product.price}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

type Props = {
  className?: string
}

const Check = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

const X = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 6 6 18" />
      <polyline points="6 6 18 18" />
    </svg>
  )
}

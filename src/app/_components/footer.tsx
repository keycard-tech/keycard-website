import Link from 'next/link'

const footerLinks = [
  {
    title: 'Product',
    links: [
      'Features',
      'Security',
      'Team',
      'Enterprise',
      'Customer stories',
      'Pricing',
      'Resources',
    ],
  },
  {
    title: 'Platform',
    links: ['Developer API', 'Partners', 'Atom', 'Electron', 'Keycard Desktop'],
  },
  {
    title: 'Support',
    links: [
      'Docs',
      'Community Forum',
      'Professional Services',
      'Skills',
      'Status',
      'Contact Keycard',
    ],
  },
  {
    title: 'Company',
    links: [
      'About',
      'Blog',
      'Careers',
      'Press',
      'Inclusion',
      'Social Impact',
      'Shop',
    ],
  },
]

export default function Footer() {
  return (
    <footer className="rounded-12 bg-orange px-6 py-12 text-white-100">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
        {footerLinks.map((column, index) => (
          <div key={index}>
            <h3 className="mb-4 font-500">{column.title}</h3>
            <ul className="space-y-2">
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link href="#" className="hover:underline">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}

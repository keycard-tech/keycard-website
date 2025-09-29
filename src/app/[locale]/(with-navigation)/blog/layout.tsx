import { Metadata } from '~/app/_metadata'
import { Providers } from './_providers'

type Props = {
  children: React.ReactNode
}

export const metadata = Metadata({
  title: {
    template: '%s - Blog - Keycard',
    default: 'Blog',
  },
  description: 'Thoughts, stories and ideas.',
})

export default function BlogLayout({ children }: Props) {
  return (
    <Providers>
      <div className="mt-[84px]">{children}</div>
    </Providers>
  )
}

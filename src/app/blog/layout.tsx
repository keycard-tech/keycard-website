import { Providers } from './_providers'

type Props = {
  children: React.ReactNode
}

export default function BlogLayout({ children }: Props) {
  return <Providers>{children}</Providers>
}

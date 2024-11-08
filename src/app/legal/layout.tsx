type Props = {
  children: React.ReactNode
}

export default function LegalLayout({ children }: Props) {
  return (
    <div className="m-auto max-w-[664px] px-5 py-8 xl:py-12">{children}</div>
  )
}

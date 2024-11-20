type Props = {
  children: React.ReactNode
}

export default function KeycardLayout({ children }: Props) {
  return (
    <div className="overflow-x-hidden">
      <div className="m-auto max-w-[1512px]">{children}</div>
    </div>
  )
}

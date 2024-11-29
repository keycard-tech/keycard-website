type Props = {
  children: React.ReactNode
}

export default function StartLayout({ children }: Props) {
  return (
    <div className="mx-auto mt-[88px] w-full max-w-[1320px]">{children}</div>
  )
}

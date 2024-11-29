type Props = {
  children: React.ReactNode
}

export default function StartLayout({ children }: Props) {
  return <div className="mx-auto mt-[88px] max-w-[1160px]">{children}</div>
}

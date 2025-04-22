type Props = {
  children: React.ReactNode
}

export default function KeycardLayout({ children }: Props) {
  return <div className="m-auto w-full max-w-[1512px]">{children}</div>
}

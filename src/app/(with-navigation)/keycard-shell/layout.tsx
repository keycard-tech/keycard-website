type Props = {
  children: React.ReactNode
}

export default function KeycardShellLayout({ children }: Props) {
  return <div className="m-auto max-w-[1512px]">{children}</div>
}

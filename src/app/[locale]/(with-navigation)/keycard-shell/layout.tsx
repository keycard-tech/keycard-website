type Props = {
  children: React.ReactNode
}

export default function KeycardShellLayout({ children }: Props) {
  return <div className="m-auto w-full max-w-[1512px]">{children}</div>
}

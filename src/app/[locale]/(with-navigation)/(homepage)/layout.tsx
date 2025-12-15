type Props = {
  children: React.ReactNode
}

export default function HomepageLayout({ children }: Props) {
  return (
    <div className="relative m-auto mt-20 w-full max-w-[1512px] lg:mt-[92px]">
      {children}
    </div>
  )
}

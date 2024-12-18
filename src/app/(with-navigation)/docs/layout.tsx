import config from '~/config/docs.json'
import Sidenav from './_components/sidenav'

type Props = {
  children: React.ReactNode
}

export default async function DocsLayout({ children }: Props) {
  return (
    <div className="relative mt-[84px] w-full">
      <div className="absolute bottom-0 left-0 top-12 border-white-12 lg:border-r">
        <div className="sticky top-[100px] hidden lg:block">
          <Sidenav items={config} />
        </div>
      </div>

      {children}
    </div>
  )
}

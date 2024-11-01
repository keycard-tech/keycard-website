import config from '~/config/docs.json'
import { IconChevronRight } from './_components/icon-chevron-right'
import Sidenav from './_components/sidenav'

export default async function HomePage() {
  return (
    <div className="relative w-full">
      {/* BREADCRUMBS */}
      <div className="border-y border-white-12 px-8 py-3">
        <div className="flex items-center gap-2 text-white-60">
          <a href="#" className="text-16 font-500 text-white-95">
            Documentation
          </a>{' '}
          <IconChevronRight /> <a href="#">Category</a> <IconChevronRight />{' '}
          Active
        </div>
      </div>

      {/* CONTENT temporary height */}
      <div className="flex min-h-[calc(100vh-100px)]">
        {/* SIDEBAR */}
        <Sidenav items={config} />

        {/* CONTENT */}
        <div className="flex flex-1 px-[140px] py-20">There&apos;s content</div>

        {/* CONTENT NAV */}
        <div className="flex w-[190px] py-20 pr-[94px]">content navigation</div>
      </div>
    </div>
  )
}

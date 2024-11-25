import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { downloadUrl } from '~/app/_utils/download-url'
import { Button } from '~components/button'
import { ButtonLink } from '~components/button-link'
import {
  STATUS_DESKTOP_DOWNLOAD_URL_LINUX,
  STATUS_DESKTOP_DOWNLOAD_URL_MACOS_INTEL,
  STATUS_DESKTOP_DOWNLOAD_URL_MACOS_SILICON,
  STATUS_DESKTOP_DOWNLOAD_URL_WINDOWS,
} from '~config/routes'
import { Apple, ChevronDown, Linux, Windows } from '~icons'
import { cx } from 'cva'

type Props = {
  className?: string
}

const DownloadStatusForDesktop = (props: Props) => {
  const { className } = props

  return (
    <div
      className={cx([
        'flex w-full max-w-[549px] flex-col gap-6 rounded-28 border border-white-8 bg-white-3 p-6 pt-5',
        className,
      ])}
    >
      <div className="flex flex-col gap-[6px]">
        <p className="font-lora text-24 font-400 text-white-95">
          Download Status for Desktop
        </p>
        <p className="font-300 text-white-80">
          Available for Mac, Windows and Linux
        </p>
      </div>
      <div className="flex h-10 gap-3">
        <MacOsPicker />
        <ButtonLink
          variant="secondary"
          className="!p-[10px]"
          href={STATUS_DESKTOP_DOWNLOAD_URL_WINDOWS}
        >
          <Windows />
        </ButtonLink>
        <ButtonLink
          variant="secondary"
          className="!p-[10px]"
          href={STATUS_DESKTOP_DOWNLOAD_URL_LINUX}
        >
          <Linux />
        </ButtonLink>
      </div>
    </div>
  )
}

export { DownloadStatusForDesktop }

const MacOsPicker = () => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild className="">
        <Button
          variant="secondary"
          icon={
            <div className="ml-1 flex size-[14px] items-center justify-center rounded-full bg-white-12">
              <ChevronDown />
            </div>
          }
        >
          <Apple /> Download for macOS
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={4}
          align="start"
          className="flex w-[225px] flex-col gap-1 rounded-12 border border-white-12 bg-dark-60 p-1"
        >
          <DropdownMenu.Item
            className="cursor-pointer rounded-[8px] bg-white-3 px-3 py-1 transition-colors hover:bg-white-8"
            onSelect={() =>
              downloadUrl(STATUS_DESKTOP_DOWNLOAD_URL_MACOS_SILICON)
            }
          >
            Apple Silicon
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="cursor-pointer rounded-[8px] bg-white-3 px-3 py-1 transition-colors hover:bg-white-8"
            onSelect={() =>
              downloadUrl(STATUS_DESKTOP_DOWNLOAD_URL_MACOS_INTEL)
            }
          >
            Intel
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

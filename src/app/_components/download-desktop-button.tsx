'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  STATUS_APPS_DESKTOP_URL,
  STATUS_DESKTOP_DOWNLOAD_URL_LINUX,
  STATUS_DESKTOP_DOWNLOAD_URL_MACOS_INTEL,
  STATUS_DESKTOP_DOWNLOAD_URL_MACOS_SILICON,
  STATUS_DESKTOP_DOWNLOAD_URL_WINDOWS,
} from '~/config/routes'
import { Apple, ChevronDown, Linux, Windows } from '~icons'
import { downloadUrl } from '../_utils/download-url'
import { Button } from './button'
import { ButtonLink } from './button-link'

type Props = {
  show?: 'single' | 'all'
}

export const DownloadDesktopButton = (props: Props) => {
  const { show = 'single' } = props

  const prefix = 'Download for'

  const macos = 'macOS'
  const windows = 'Windows'
  const linux = 'Linux'
  const desktop = 'desktop'

  if (show === 'single') {
    return (
      <>
        <div className="hidden macos:contents">
          <MacOsPicker>
            <>
              {prefix} {macos}
            </>
          </MacOsPicker>
        </div>

        <div className="hidden windows:contents">
          <WindowsDownloadButton>
            <>
              {prefix} {windows}
            </>
          </WindowsDownloadButton>
        </div>

        <div className="hidden linux:contents">
          <LinuxDownloadButton>
            <>
              {prefix} {linux}
            </>
          </LinuxDownloadButton>
        </div>

        <div className="hidden ios:contents android:contents unknown:contents">
          <DesktopDownloadButton>
            <>
              {prefix} {desktop}
            </>
          </DesktopDownloadButton>
        </div>
      </>
    )
  }

  return (
    <div className="flex gap-2">
      <div className="order-2 inline-flex macos:order-1 ios:order-1">
        <MacOsPicker>
          <span className="hidden macos:contents ios:contents">
            {prefix} {macos}
          </span>
        </MacOsPicker>
      </div>

      <div className="order-2 inline-flex windows:order-1 android:order-1">
        <WindowsDownloadButton>
          <span className="hidden windows:contents android:contents unknown:contents">
            {prefix} {windows}
          </span>
        </WindowsDownloadButton>
      </div>

      <div className="order-2 inline-flex linux:order-1 android:order-2 unknown:order-1">
        <LinuxDownloadButton>
          <span className="hidden linux:contents unknown:contents">
            {prefix} {linux}
          </span>
        </LinuxDownloadButton>
      </div>
    </div>
  )
}

type DownloadButtonProps = {
  children: React.ReactNode
}

const LinuxDownloadButton = (props: DownloadButtonProps) => {
  const { children } = props

  return (
    <>
      <div className="hidden macos:contents windows:contents ios:contents android:contents">
        <ButtonLink
          variant="secondary"
          className="!p-[10px]"
          href={STATUS_DESKTOP_DOWNLOAD_URL_LINUX}
          aria-label="Download for Linux"
        >
          <Linux />
        </ButtonLink>
      </div>
      <div className="hidden linux:contents unknown:contents">
        <ButtonLink
          variant="secondary"
          href={STATUS_DESKTOP_DOWNLOAD_URL_LINUX}
          aria-label="Download for Linux"
          icon={<Linux />}
        >
          {children}
        </ButtonLink>
      </div>
    </>
  )
}

const WindowsDownloadButton = (props: DownloadButtonProps) => {
  const { children } = props

  return (
    <>
      <div className="hidden macos:contents linux:contents ios:contents unknown:contents">
        <ButtonLink
          variant="secondary"
          className="!p-[10px]"
          href={STATUS_DESKTOP_DOWNLOAD_URL_WINDOWS}
          aria-label="Download for Windows"
        >
          <Windows />
        </ButtonLink>
      </div>
      <div className="hidden windows:contents android:contents">
        <ButtonLink
          variant="secondary"
          href={STATUS_DESKTOP_DOWNLOAD_URL_WINDOWS}
          aria-label="Download for Windows"
          icon={<Windows />}
        >
          {children}
        </ButtonLink>
      </div>
    </>
  )
}

const MacOsPicker = (props: DownloadButtonProps) => {
  const { children } = props
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
          <Apple /> {children}
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={4}
          align="start"
          className="flex w-[225px] flex-col gap-1 rounded-12 border border-white-12 bg-dark-60 p-1"
        >
          <DropdownMenu.Item
            className="cursor-pointer rounded-[8px] bg-white-4 px-3 py-1 transition-colors hover:bg-white-8"
            onSelect={() =>
              downloadUrl(STATUS_DESKTOP_DOWNLOAD_URL_MACOS_SILICON)
            }
          >
            Apple Silicon
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="cursor-pointer rounded-[8px] bg-white-4 px-3 py-1 transition-colors hover:bg-white-8"
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

const DesktopDownloadButton = (props: DownloadButtonProps) => {
  const { children } = props
  return (
    <>
      <div className="hidden ios:contents android:contents unknown:contents">
        <ButtonLink
          variant="secondary"
          href={STATUS_APPS_DESKTOP_URL}
          aria-label="Download for desktop"
        >
          {children}
        </ButtonLink>
      </div>
    </>
  )
}

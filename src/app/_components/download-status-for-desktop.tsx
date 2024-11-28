import { DownloadDesktopButton } from '~components/download-desktop-button'
import { cx } from 'cva'

type Props = {
  className?: string
  title?: string
}

const DownloadStatusForDesktop = (props: Props) => {
  const { className, title = 'Download Status for Desktop' } = props

  return (
    <div
      className={cx([
        'flex w-full max-w-[549px] flex-col gap-6 rounded-28 border border-white-8 bg-white-4 p-6 pt-5',
        className,
      ])}
    >
      <div className="flex flex-col gap-[6px]">
        <p className="font-lora text-24 font-400 text-white-95">{title}</p>
        <p className="font-300 text-white-80">
          Available for Mac, Windows and Linux
        </p>
      </div>
      <div className="flex h-10 gap-3">
        <DownloadDesktopButton show="all" />
      </div>
    </div>
  )
}

export { DownloadStatusForDesktop }

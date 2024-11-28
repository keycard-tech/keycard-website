import { Image } from '~components/image'
import {
  STATUS_MOBILE_APP_STORE_URL,
  STATUS_MOBILE_F_DROID_URL,
  STATUS_MOBILE_GOOGLE_PLAY_URL,
} from '~config/routes'
import { cx } from 'cva'
import Link from 'next/link'

type Props = {
  className?: string
  title?: string
}

const DownloadStatusForMobile = (props: Props) => {
  const { className, title = 'Download Status for Mobile' } = props

  return (
    <div
      className={cx([
        'flex w-full max-w-[549px] flex-col gap-6 rounded-28 border border-white-4 bg-white-4 p-6 pt-5',
        className,
      ])}
    >
      <div className="flex flex-col gap-[6px]">
        <p className="font-lora text-24 font-400 text-white-95">{title}</p>
        <p className="font-300 text-white-80">Available for iOS or Android</p>
      </div>

      <div className="flex gap-3">
        <Link href={STATUS_MOBILE_APP_STORE_URL}>
          <Image
            src="/assets/keycard/appstore.png"
            width={140}
            height={40}
            alt="Download on App Store"
            className="h-10 w-auto"
          />
        </Link>
        <Link href={STATUS_MOBILE_GOOGLE_PLAY_URL}>
          <Image
            src="/assets/keycard/googleplay.png"
            width={142}
            height={40}
            className="h-10 w-auto"
            alt="Get it on Google Play"
          />
        </Link>
        <Link href={STATUS_MOBILE_F_DROID_URL}>
          <Image
            src="/assets/keycard/fdroid.png"
            width={120}
            height={40}
            className="h-10 w-auto"
            alt="Get it on F-Droid"
          />
        </Link>
      </div>
    </div>
  )
}

export { DownloadStatusForMobile }

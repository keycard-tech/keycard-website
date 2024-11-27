import { Button } from '~components/button'
import { ButtonLink } from '~components/button-link'
import { Link } from '~components/link'
import { Customize, External } from '~icons'
import Image from 'next/image'
import { Usb } from '../_icons/usb'

export default function StartPage() {
  return (
    <div className="pb-[120px] pt-20">
      <div className="mb-6 grid grid-flow-row gap-3">
        <h1 className="font-lora text-32 font-400 text-white-95 lg:text-48">
          Get started with Keycard
        </h1>
        <p className="font-inter text-20 font-300 text-white-95">
          Follow our step-by-step guides to set up your Keycard
        </p>
      </div>
      <div className="mt-14 grid grid-flow-row gap-3">
        <h2 className="mb-6 flex justify-start gap-3 font-lora text-32 font-400 text-white-95">
          <span className="text-orange">1</span> Download Status
        </h2>
        <div className="mb-6 flex flex-col gap-5 rounded-28 border border-white-8 bg-white-3 p-3 pt-5">
          <Image
            src="/assets/status-logo.png"
            alt="Status logo"
            width={120}
            height={32}
            className="ml-3"
          />
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex flex-1 flex-col rounded-20 border border-white-8 bg-white-3 p-6 pt-4">
              <h3 className="mb-[6px] font-lora text-24 font-400 text-white-95">
                Desktop
              </h3>
              <p className="mb-6 font-inter text-16 font-300 text-white-80">
                Available for Mac, Windows and Linux
              </p>
              <div className="grid grid-flow-col justify-start gap-3">
                <Button variant="secondary">MacOS</Button>
                <Button variant="secondary">Win</Button>
                <Button variant="secondary">Lin</Button>
              </div>
            </div>
            <div className="flex flex-1 flex-col rounded-20 border border-white-8 bg-white-3 p-6 pt-4">
              <h3 className="mb-[6px] font-lora text-24 font-400 text-white-95">
                Mobile
              </h3>
              <p className="mb-6 font-inter text-16 font-300 text-white-80">
                Available for iOS or Android
              </p>
              <div className="grid grid-flow-row justify-start gap-3 lg:grid-flow-col">
                <Link
                  href="https://apps.apple.com/us/app/status-private-communication/id1178893006"
                  className="overflow-hidden rounded-6 border border-white-12"
                >
                  <Image
                    src="/assets/start/app-store.png"
                    alt="App Store logo"
                    width={143}
                    height={40}
                  />
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=im.status.ethereum&pcampaignid=web_share"
                  className="overflow-hidden rounded-6 border border-white-12"
                >
                  <Image
                    src="/assets/start/google-play.png"
                    alt="Google Play logo"
                    width={139}
                    height={40}
                  />
                </Link>
                <Link
                  href="https://f-droid.org/packages/im.status.ethereum"
                  className="overflow-hidden rounded-6 border border-white-12"
                >
                  <Image
                    src="/assets/start/f-droid.png"
                    width={116}
                    height={40}
                    alt="F-Droid logo"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-16 border border-dashed border-white-12 bg-white-3 px-4 py-[14px] text-14 font-300 text-white-60">
            <span className="flex items-center gap-1">
              <Usb className="shrink-0 text-white-95" /> Desktop requires an NFC
              card reader
            </span>
            &bull;
            <span className="flex items-center gap-1">
              <Customize className="shrink-0 text-white-95" /> View basic
              features available by platform
            </span>
          </div>
        </div>
      </div>
      <h2 className="my-6 flex justify-start gap-3 font-lora text-32 font-400 text-white-95">
        <span className="text-orange">2</span> Follow our guides
      </h2>
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="flex flex-1 flex-col rounded-28 border border-white-8 bg-white-3 p-6 pt-5">
          <h3 className="mb-1 font-lora text-24 font-400 text-white-95">
            If you never used Status
          </h3>
          <p className="mb-6 font-inter text-16 font-300 text-white-80">
            Learn how to create and store your keys directly on Keycard
          </p>
          <ButtonLink
            href="https://status.app/help/profile/create-a-status-profile-using-keycard"
            variant="secondary"
            icon={<External />}
          >
            Get started
          </ButtonLink>
        </div>
        <div className="flex flex-1 flex-col rounded-28 border border-white-8 bg-white-3 p-6 pt-5">
          <h3 className="mb-1 font-lora text-24 font-400 text-white-95">
            If you already have a Status profile
          </h3>
          <p className="mb-6 font-inter text-16 font-300 text-white-80">
            Learn how to move your keys to Keycard
          </p>
          <ButtonLink
            href="https://status.app/help/profile/secure-your-status-profile-or-wallet-with-keycard"
            variant="secondary"
            icon={<External />}
          >
            Get started
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

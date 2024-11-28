import { Customize, Usb } from '~icons'
import { FeaturesDialog } from './features-dialog'

const FeaturesDisclaimer = () => {
  return (
    <div className="w-full @container/main">
      <div className="flex flex-col items-start justify-center gap-2 rounded-16 border border-dashed border-white-12 bg-white-4 px-4 py-[14px] @[519px]/main:flex-row @[519px]/main:items-center">
        <div className="flex items-center gap-1">
          <Usb className="shrink-0" />
          <p className="text-14 font-300 text-white-60">
            Desktop requires an NFC card reader
          </p>
        </div>
        <div className="hidden size-1 rounded-full bg-white-40 @[519px]/main:block" />
        <div className="flex items-center gap-1">
          <Customize className="shrink-0" />
          <p className="text-14 font-300 text-white-60">
            View other{' '}
            <FeaturesDialog>
              <button className="underline transition-colors hover:text-orange">
                features
              </button>
            </FeaturesDialog>{' '}
            availalble
          </p>
        </div>
      </div>
    </div>
  )
}

export { FeaturesDisclaimer }

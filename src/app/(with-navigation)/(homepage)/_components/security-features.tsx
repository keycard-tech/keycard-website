import { FirmwareIcon } from '@status-im/icons/20'
import { GithubIcon } from '@status-im/icons/social'
import { ButtonLink } from '~components/button-link'
import { Image } from '~components/image'
import { Tag } from '~components/tag'

const SecurityFeatures = () => {
  return (
    <section className="relative mt-[100px] overflow-clip px-3 lg:mt-[227px] lg:px-0">
      <div className="rounded-28 border border-white-8 bg-white-4 px-6 md:px-0">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="relative -mx-6 flex-1 self-start lg:mx-0">
            <div className="absolute -left-1/2 top-0 z-0 h-[390px] w-[1198px] translate-y-[-190px] -rotate-45 bg-gradient-to-b from-dark-100 to-[transparent]" />
            <Image
              src="/assets/keycard/chip.png"
              alt="Keycard security"
              width={580}
              height={736}
              priority
            />
          </div>
          <div className="py-20 pb-6 md:pb-20 md:pl-6 lg:w-1/2 lg:pl-0 lg:pr-[72px]">
            <h2 className="pb-[52px] font-lora text-32 lg:pb-14">
              Proudly building in the open
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="md:border-r md:border-dashed md:border-white-20">
                <div className="pb-6 md:pb-[28px] md:pl-0 md:pr-6">
                  <h3 className="pb-2 font-lora text-24 font-400 text-white-95">
                    Best-in-class chip
                  </h3>
                  <p className="pb-6 text-16 font-300 text-white-60">
                    Keycard secure element has the highest level of
                    certification provided by Common Criteria.
                  </p>

                  <Tag gradient icon={<FirmwareIcon />}>
                    EAL6+
                  </Tag>
                </div>
                <div className="border-t border-dashed border-white-20 pb-6 pt-5 md:pb-0 md:pl-0 md:pr-6 md:pt-6">
                  <h3 className="pb-2 font-lora text-24 font-400 text-white-95">
                    Non-extractable keys
                  </h3>
                  <p className="text-16 font-300 text-white-60">
                    The secure element software is non-upgradable and no one
                    will ever change its software to change its behaviour.
                  </p>
                </div>
              </div>
              <div>
                <div className="border-t border-dashed border-white-20 pb-[28px] pt-5 md:border-t-0 md:pl-6 md:pt-0">
                  <h3 className="pb-2 font-lora text-24 font-400 text-white-95">
                    Counterfeit protected
                  </h3>
                  <p className="text-16 font-300 text-white-60">
                    Our open-source protocol allows any wallet using the Keycard
                    to check it&apos;s genuine and not counterfeited.
                  </p>
                </div>
                <div className="border-t border-dashed border-white-20 pt-5 md:p-6 md:pb-0">
                  <h3 className="pb-2 font-lora text-24 font-400 text-white-95">
                    Fully open source
                  </h3>
                  <p className="pb-6 text-16 font-300 text-white-60">
                    Open-source code on an open framework, making it the most
                    open way to design a secure element.
                  </p>
                  <ButtonLink
                    href="https://github.com/keycard-tech/status-keycard"
                    className="font-500 [&_path]:hover:fill-white-dark"
                    variant="white"
                  >
                    View on Github
                    <GithubIcon />
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { SecurityFeatures }

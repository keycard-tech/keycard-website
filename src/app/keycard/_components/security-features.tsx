import { ButtonLink } from '~components/button-link'
import { Tag } from '~components/tag'
import { Github, Shield } from '~icons'
import Image from 'next/image'

const SecurityFeatures = () => {
  return (
    <section className="relative flex w-full overflow-clip rounded-28 border border-white-8 bg-white-3">
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <div className="flex-1 self-start">
          <Image
            src="/assets/keycard/security.png"
            alt="Keycard security"
            width={680}
            height={695}
            priority
          />
        </div>
        <div className="py-20 md:pr-[72px] lg:w-1/2">
          <h2 className="pb-14 pl-6 font-lora text-32 md:pl-0">
            Unparalleled security
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="md:border-r md:border-dashed md:border-white-20">
              <div className="pb-[28px] pl-6 md:pl-0 md:pr-6">
                <h3 className="pb-2 font-lora text-24 font-400 text-white-95">
                  Best in class chip
                </h3>
                <p className="pb-6 font-300 text-white-60">
                  Keycard secure element has the highest level of certification
                  provided by Common Criteria.
                </p>

                <Tag gradient icon={<Shield />}>
                  EAL6+
                </Tag>
              </div>
              <div className="pb-[50px] pl-6 pt-6 md:border-t md:border-dashed md:border-white-20 md:pl-0 md:pr-6">
                <h3 className="pb-2 font-lora text-24 font-400 text-white-95">
                  Non extractable keys
                </h3>
                <p className="font-300 text-white-60">
                  The secure element software is non upgradable and no one will
                  ever change its software to change this behaviour.
                </p>
              </div>
            </div>
            <div>
              <div className="pb-[28px] pl-6">
                <h3 className="pb-2 font-lora text-24 font-400 text-white-95">
                  Counterfeit protected
                </h3>
                <p className="font-300 text-white-60">
                  Our open source protocol allows any wallet using the keycard
                  to check it&apos;s genuine and not counterfeited.
                </p>
              </div>
              <div className="p-6 pb-0 md:border-t md:border-dashed md:border-white-20">
                <h3 className="pb-2 font-lora text-24 font-400 text-white-95">
                  Fully open source
                </h3>
                <p className="pb-6 font-300 text-white-60">
                  Open source code on an open framework, making it the most open
                  way to design a secure element.
                </p>
                <ButtonLink
                  href="https://github.com"
                  className="font-500 [&_path]:hover:fill-white-dark"
                  variant="white"
                >
                  <span>View on Github</span>
                  <Github />
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { SecurityFeatures }

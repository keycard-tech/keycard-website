import Image from 'next/image'

const AirGapped = () => {
  const wallets = [
    {
      name: 'Metamask',
      network: 'Ethereum',
      image: '/assets/keycard-pro/wallets/metamask.png',
    },
    {
      name: 'imToken',
      network: 'Ethereum',
      image: '/assets/keycard-pro/wallets/im-token.png',
    },
    {
      name: 'Rabby',
      network: 'Ethereum',
      image: '/assets/keycard-pro/wallets/rabbit.png',
    },
    {
      name: 'Backpack',
      network: 'Ethereum',
      image: '/assets/keycard-pro/wallets/back-pack.png',
    },
    {
      name: 'UniSat',
      network: 'Bitcoin',
      image: '/assets/keycard-pro/wallets/uni-sat.png',
    },
    {
      name: 'Blue',
      network: 'Bitcoin',
      image: '/assets/keycard-pro/wallets/blue.png',
    },
    {
      name: 'Sparrow',
      network: 'Bitcoin',
      image: '/assets/keycard-pro/wallets/sparrow.png',
    },
    {
      name: 'Specter',
      network: 'Bitcoin',
      image: '/assets/keycard-pro/wallets/specter.png',
    },
  ]

  return (
    <section className="relative mb-[100px] grid items-center overflow-y-clip px-5 pb-[100px] pt-[120px] lg:grid-cols-2">
      <div className="relative">
        <div className="relative right-0 lg:absolute lg:h-[678px] lg:-translate-y-60">
          <div className="absolute bottom-0 z-10 h-96 w-full bg-gradient-to-b from-[transparent] to-dark-100 lg:bottom-28" />
          <Image
            alt="Hardware wallet device with QR display"
            height={800}
            width={1600}
            className="w-full max-w-max lg:w-[1000px] lg:max-w-[1000px]"
            src="/assets/keycard-pro/keycard-with-macbook.png"
          />
        </div>
      </div>

      <div className="flex w-full max-w-[549px] flex-col justify-self-start pl-3">
        <div>
          <h2 className="mb-2 font-lora text-32">Something about airgapped</h2>
          <p className="text-16 font-300 text-white-60">
            Sign transactions on your favourite wallets through QR signing
          </p>
        </div>

        <div className="mt-14">
          <div className="mb-5 text-12 text-white-80">
            TRANSACTION SIGNING WITH
          </div>
          <div className="grid grid-cols-2">
            {wallets.map((wallet, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 border-b border-dashed border-white-20 py-3 even:border-l even:border-white-20 even:pl-3 [&:nth-child(-n+2)]:pt-0 [&:nth-last-child(-n+2)]:border-b-0 [&:nth-last-child(-n+2)]:pb-0"
              >
                <div className="flex size-10 items-center justify-center rounded-28 bg-dark-60">
                  <Image
                    src={wallet.image}
                    alt={`${wallet.name} icon`}
                    height={40}
                    width={40}
                  />
                </div>
                <div>
                  <div className="font-500">{wallet.name}</div>
                  <div className="text-16 text-white-80">{wallet.network}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { AirGapped }

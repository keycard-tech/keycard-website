import { Video } from '~components/video'

const steps = [
  {
    title: 'Insert Keycard',
    description:
      'Insert Keycard into Shell to turn it on. Unlock it with its secret PIN.',
  },
  {
    title: 'Scan transaction QR',
    description: 'Use Shell’s camera to scan the QR presented by the wallet.',
  },
  {
    title: 'Read transaction data',
    description:
      'Read and verify the transaction data on Shell’s large screen.',
  },
  {
    title: 'Scan QR with wallet',
    description:
      'On your wallet scan the QR that shows up on your Shell device.',
  },
]

const Demo = () => {
  // TODO add video assets when final versions are ready
  const keycardShellWebmSrc = '/assets/videos/keycard-shell.webm'
  const keycardShellMp4Src = '/assets/videos/keycard-shell.mp4'

  return (
    <>
      <section className="relative max-w-[1352px] px-3 pt-[120px] md:mx-auto md:pt-[200px] min-[1512px]:px-0">
        <div className="flex flex-col gap-14 pb-10">
          <h2 className="font-lora text-32 text-white-95">
            A seamless wallet experience
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col gap-[6px]">
                <div className="flex items-center gap-3 font-lora text-24 font-400 text-white-95">
                  <span className="text-orange">{index + 1}</span> {step.title}
                </div>
                <div className="text-20 font-300 text-white-60">
                  {step.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Video
          mp4Src={keycardShellMp4Src}
          webmSrc={keycardShellWebmSrc}
          ariaLabel="Keycard shell video demonstration"
        />
      </section>
    </>
  )
}

export { Demo }

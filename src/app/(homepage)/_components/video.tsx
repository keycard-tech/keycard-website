import { Tabs, TabsContent, TabsList, TabsTrigger } from '~components/tabs'

const Video = () => {
  const keycardWebmSrc = '/assets/videos/keycard.webm'
  const keycardMp4Src = '/assets/videos/keycard.mp4'
  const keycardShellWebmSrc = '/assets/videos/keycard-shell.webm'
  const keycardShellMp4Src = '/assets/videos/keycard-shell.mp4'

  return (
    <>
      <section className="relative max-w-[1352px] px-3 pt-[120px] md:mx-auto md:pt-[200px] min-[1512px]:px-0">
        <div className="flex max-w-[436px] flex-col gap-2 pb-9 md:pb-14">
          <h2 className="font-lora text-32 text-white-95">
            A seamless wallet experience
          </h2>
          <p className="text-20 font-300">
            Understand how to complete a transaction using Keycard and Keycard
            Shell
          </p>
        </div>
        <div className="min-h-[calc(100%/0.79)] md:min-h-[calc(100%/1.88)]">
          <Tabs defaultValue="keycard">
            <TabsList className="bottom-10 left-1/2 z-10 mb-14 md:absolute md:mb-0 md:-translate-x-1/2">
              <TabsTrigger value="keycard" aria-label="Keycard video tab">
                Keycard only
              </TabsTrigger>
              <TabsTrigger
                value="keycard-shell"
                aria-label="Keycard shell video tab"
              >
                Keycard shell
              </TabsTrigger>
            </TabsList>
            <TabsContent value="keycard">
              <video
                className="aspect-[0.79] w-full rounded-28 border border-white-12 object-cover md:aspect-[1.88]"
                autoPlay
                loop
                playsInline
                muted
                aria-label="Keycard video demonstration"
              >
                <source src={keycardMp4Src} type="video/mp4" />
                <source src={keycardWebmSrc} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </TabsContent>
            <TabsContent value="keycard-shell">
              <video
                className="aspect-[0.79] w-full rounded-28 border border-white-12 object-cover md:aspect-[1.88]"
                autoPlay
                loop
                playsInline
                muted
                aria-label="Keycard shell video demonstration"
              >
                <source src={keycardShellMp4Src} type="video/mp4" />
                <source src={keycardShellWebmSrc} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}

export { Video }

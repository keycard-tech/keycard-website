import { Tabs, TabsContent, TabsList, TabsTrigger } from '~components/tabs'

// import { Video } from '~components/video'

const Demo = () => {
  // TODO add video assets when final versions are ready
  // const keycardWebmSrc = '/assets/videos/keycard.webm'
  // const keycardMp4Src = '/assets/videos/keycard.mp4'
  // const keycardShellWebmSrc = '/assets/videos/keycard-shell.webm'
  // const keycardShellMp4Src = '/assets/videos/keycard-shell.mp4'

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
              {/* <Video
                mp4Src={keycardMp4Src}
                webmSrc={keycardWebmSrc}
                ariaLabel="Keycard video demonstration"
              /> */}
            </TabsContent>
            <TabsContent value="keycard-shell">
              {/* <Video
                mp4Src={keycardShellMp4Src}
                webmSrc={keycardShellWebmSrc}
                ariaLabel="Keycard shell video demonstration"
              /> */}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}

export { Demo }

import * as Tooltip from '@radix-ui/react-tooltip'

type Props = {
  children: React.ReactNode
  label: string
  side?: Tooltip.TooltipContentProps['side']
  hidden?: boolean
}

const TooltipBase = (props: Props) => {
  const { children, label, hidden, side = 'top' } = props

  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            hidden={hidden}
            className="relative select-none rounded-12 border bg-white-95 px-3 py-2 text-16 font-500 leading-none text-dark-100 backdrop-blur-[20px] will-change-[transform,opacity] data-[state=delayed-open]:animate-slideDownAndFade"
            side={side}
            sideOffset={4}
            align="center"
          >
            {label}
            <Tooltip.Arrow className="fill-white-95" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export { TooltipBase as Tooltip }

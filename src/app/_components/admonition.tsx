import { CustomizeIcon, InfoIcon, WarningRedIcon } from '@status-im/icons/16'
import { renderText } from '~/app/_utils/render-text'
import { cva } from 'cva'
import { match } from 'ts-pattern'

type Props =
  | {
      type: 'note' | 'tip' | 'caution'
      children: React.ReactNode | React.ReactNode[]
    }
  | {
      type: 'beta'
      status: string
      children: React.ReactNode | React.ReactNode[]
    }

const Admonition = (props: Props) => {
  const { type } = props

  return (
    <div className={stylesBox(props)}>
      <div className="min-w-[640px] max-w-screen-sm">
        <header className={stylesHeader(props)}>
          {match(type)
            .with('note', () => <InfoIcon className="text-orange" />)
            .with('tip', () => <CustomizeIcon className="text-green" />)
            .with('caution', () => (
              <WarningRedIcon className="[&>path[fill='#E95460']]:fill-orange" />
            ))
            .with('beta', () => (
              <WarningRedIcon className="[&>path[fill='#E95460']]:fill-white-80" />
            ))
            .exhaustive()}
          <span className="text-16 font-500">
            {type === 'beta' ? props.status : type}
          </span>
        </header>
        <div className="bg-dark-100 p-3">
          {renderText({ children: props.children, size: 'text-16' })}
        </div>
      </div>
    </div>
  )
}

const stylesBox = cva({
  base: [
    'min-w-[352px] max-w-screen-sm overflow-hidden rounded-16 border shadow-sm',
  ],
  variants: {
    type: {
      note: 'border-white-12 bg-white-8 ',
      tip: 'border-green/[0.2] bg-green/[0.12] ',
      caution: 'border-orange/[0.2] bg-orange/[0.12] ',
      beta: 'border-white-12 bg-white-8 ',
    },
  },
})

const stylesHeader = cva({
  base: 'flex items-center gap-2 border-b p-3 text-white-95',
  variants: {
    type: {
      note: 'border-white-12 capitalize',
      tip: 'border-green/[0.2]  capitalize',
      caution: 'border-orange/[0.2] capitalize',
      beta: 'border-white-12 ',
    },
  },
})

export { Admonition, type Props as AdmonitionProps }

import { BulletIcon, CheckIcon } from '@status-im/icons/20'
import * as icons from '@status-im/icons/20'
import { Link } from '~components/link'
import { cx } from 'cva'
import {
  Children,
  cloneElement,
  ComponentProps,
  memo,
  ReactElement,
  ReactNode,
} from 'react'
import { match } from 'ts-pattern'
import { renderText } from '../_utils/render-text'
import { Admonition } from './admonition'
import { AnchorLink } from './anchor-link'
import { CodeBlock } from './code-block'
import { Step } from './step'
import {
  Table,
  TableCell,
  TableContent,
  TableHead,
  TableHeader,
  TableRow,
} from './table'

const paragraphMarginTop: Record<48 | 32 | 24 | 20 | 16 | 12, string> = {
  // note: ref `lineHeight` in tailwind.config.ts#theme.fontSize
  48: '[&+p]:!mt-[2rem]',
  32: '[&+p]:!mt-[1.75rem]',
  24: '[&+p]:!mt-[1.359375rem]',
  20: '[&+p]:!mt-[1.1375rem]',
  16: '[&+p]:!mt-[1.1375rem]',
  12: '[&+p]:!mt-[1.1375rem]',
}

const paragraphTextSize: Record<48 | 32 | 24 | 20 | 16 | 12, string> = {
  48: 'text-48',
  32: 'text-32',
  24: 'text-24',
  20: 'text-20',
  16: 'text-16',
  12: 'text-12',
}

const blockquoteParagraphTextSize: Record<24 | 20 | 16, string> = {
  24: '[&>p>*]:text-24',
  20: '[&>p>*]:text-20',
  16: '[&>p>*]:text-16',
}

const iconComponents = Object.entries(icons).reduce((acc, [name, Icon]) => {
  const IconComponent = memo((props: React.ComponentPropsWithoutRef<'svg'>) => (
    <span className="inline-flex align-middle">
      <Icon {...props} />
    </span>
  ))
  IconComponent.displayName = name
  return {
    ...acc,
    [name]: IconComponent,
  }
}, {})

export const baseComponents = {
  strong: (
    props: ComponentProps<'strong'> & {
      size?: 24 | 20 | 16 | 12
    },
  ) => {
    return (
      <strong
        {...props}
        className={cx('font-600', paragraphTextSize[props.size ?? 16])}
      >
        {props.children}
      </strong>
    )
  },
  del: (
    props: ComponentProps<'del'> & {
      size?: 24 | 20 | 16 | 12
    },
  ) => {
    return (
      <del
        {...props}
        className={cx('line-through', paragraphTextSize[props.size ?? 16])}
      >
        {props.children}
      </del>
    )
  },
  em: (
    props: ComponentProps<'em'> & {
      size?: 24 | 20 | 16 | 12
    },
  ) => {
    return (
      <em
        {...props}
        className={cx(
          'font-[Inter,-apple-system,system-ui]',
          'italic',
          paragraphTextSize[props.size ?? 16],
        )}
      >
        {props.children}
      </em>
    )
  },
  h1: (props: ComponentProps<'h1'>) => {
    return (
      <h1
        {...props}
        className="group relative mb-4 scroll-m-[100px] font-lora text-48 font-400 leading-[1.16] tracking-[-0.06rem]"
      >
        <AnchorLink id={props.id!}>{props.children}</AnchorLink>
      </h1>
    )
  },
  h2: (props: ComponentProps<'h2'> & { mb?: string; mt?: string }) => {
    const { children, id, mb = 'mb-3', mt = 'mt-5', ...rest } = props
    return (
      <h2
        id={id}
        {...rest}
        className={cx(
          mb,
          mt,
          'group relative scroll-m-[100px] font-lora text-32 font-400 leading-tight tracking-[-0.04rem]',
        )}
      >
        <AnchorLink id={id!}>{children}</AnchorLink>
      </h2>
    )
  },
  h3: (props: ComponentProps<'h3'>) => {
    return (
      <h3
        {...props}
        className="group relative mb-3 mt-5 scroll-m-[100px] font-lora text-24 font-600"
      >
        <AnchorLink id={props.id!}>{props.children}</AnchorLink>
      </h3>
    )
  },
  h4: (props: ComponentProps<'h4'>) => {
    return (
      <h4
        {...props}
        className="group relative mb-3 mt-5 scroll-m-[100px] font-lora text-20 font-600"
      >
        <AnchorLink id={props.id!}>{props.children}</AnchorLink>
      </h4>
    )
  },
  h5: (props: ComponentProps<'h5'>) => {
    return (
      <h5
        {...props}
        className="group relative mb-3 mt-5 scroll-m-[100px] text-16 font-600"
      >
        <AnchorLink id={props.id!}>{props.children}</AnchorLink>
      </h5>
    )
  },
  blockquote: (
    props: ComponentProps<'blockquote'> & { size?: 24 | 20 | 16 },
  ) => {
    const { children, size = 16, ...rest } = props

    const blockquoteChildren = Children.toArray(children).filter(
      child => child !== '\n',
    )

    return (
      <blockquote
        {...rest}
        className={cx(
          blockquoteParagraphTextSize[size],
          'mt-5 border-l border-dashed border-white-4 !pt-0 pl-6',
        )}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {Children.map(blockquoteChildren, (item: any) => {
          if (typeof item === 'string') {
            return renderText({ children: item, size: paragraphTextSize[size] })
          }

          if (item.type === 'p') {
            return cloneElement(item, { size })
          }

          return item
        })}
      </blockquote>
    )
  },
  a: (
    props: ComponentProps<'a'> & {
      size?: 24 | 20 | 16 | 12
    },
  ) => {
    if (!props.href) {
      const { children, ...rest } = props
      return (
        <a
          {...rest}
          className={cx('text-orange', paragraphTextSize[props.size ?? 16])}
        >
          {children}
        </a>
      )
    }

    return (
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
        href={props.href}
        className={cx('text-orange', paragraphTextSize[props.size ?? 16])}
      >
        {props.children}
      </Link>
    )
  },
  p: (
    props: ComponentProps<'p'> & {
      size?: 48 | 32 | 24 | 20 | 16 | 12
    },
  ) => {
    const { children, size = 16 } = props

    if (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (props as any).children?.type?.name === 'img' ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (props as any).parent === 'li'
    ) {
      return <>{props.children}</>
    }

    return (
      <p
        className={cx(
          paragraphMarginTop[size],
          'my-5',
          '[:is(h1,h2,h3,h4,h5,h6)+&]:!mt-0', // immediately follows a heading as a sibling element
          // '[&:not(:has(+*))]:!mb-0', // not followed by any sibling element
          '[:is(div,td,blockquote)>&:first-child]:!mt-0', // is a first child of selected parent element
          '[:is(td)>&]:!my-0', // remove all vertical margins when inside table cells
        )}
      >
        {renderText({ children, size: paragraphTextSize[size] })}
      </p>
    )
  },
  ul: (props: ComponentProps<'ul'>) => {
    return (
      <ul className="flex flex-col gap-2 [:is(ul)+&]:mt-5 [ul_&]:mt-3">
        {props.children}
      </ul>
    )
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ol: (props: any & { parent?: string }) => {
    const listItems = Children.toArray(props.children).filter(
      child => typeof child === 'object',
      // child => Children.only(child)
    )

    return (
      <ol
        className="group flex flex-col gap-3 [:is(ol)+&]:mt-5 [ol_&]:mt-3"
        {...props}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {Children.map(listItems, (item: any, index) =>
          cloneElement(item, {
            order: index + 1,
            parent: props.parent ?? 'ol',
          }),
        )}
      </ol>
    )
  },
  li: (
    props: ComponentProps<'li'> & {
      size?: 24 | 20 | 16 | 12
      order?: number
      parent?: 'ol' | 'AwaitedList'
    },
  ) => {
    const icon = match(props.parent)
      .with('ol', () => <Step value={props.order!} />)
      .with('AwaitedList', () => <CheckIcon className="text-green" />)
      .otherwise(() => <BulletIcon />)

    return (
      <li className="flex items-start gap-2">
        <div className="mt-0.5 flex shrink-0 items-center">{icon}</div>
        <div className="w-full">
          {renderText({
            children: props.children,
            size: paragraphTextSize[props.size ?? 16],
            parent: 'li',
          })}
        </div>
      </li>
    )
  },
  // handled conditionally per use case with divider component
  hr: () => {
    return <></>
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  img: (props: any) => {
    return <img {...props} className="rounded-28" />
  },
  pre: (props: ComponentProps<'pre'>) => (
    <pre
      {...props}
      className="w-full overflow-scroll rounded-16 border border-white-12 bg-white-8 px-6 py-5 font-inter text-16 font-400 text-white-100"
    />
  ),
  div: (props: ComponentProps<'div'>) => {
    // note: style parent elements of `code` wrapped by `rehype-pretty-code` plugin
    if (Object.hasOwn(props, 'data-rehype-pretty-code-fragment')) {
      return <CodeBlock {...props} />
    }
    return <div {...props} />
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code: (props: any) => {
    const multiline = Children.toArray(props.children).length > 1

    if (
      !multiline &&
      (typeof props.children === 'string' ||
        (Array.isArray(props.children) &&
          typeof props.children[0] === 'string'))
    ) {
      return (
        <code
          {...props}
          className="relative inline-block rounded-16 border border-white-12 bg-white-8 px-2 font-inter font-400 text-white-100"
        />
      )
    }

    return <code className="w-fit" {...props} />
  },
  figure: (props: ComponentProps<'figure'>) => {
    // note: style parent elements of `code` wrapped by `rehype-pretty-code` plugin
    if (Object.hasOwn(props, 'data-rehype-pretty-code-figure')) {
      return <CodeBlock {...props} />
    }

    return <figure {...props} className="my-5" />
  },
  Admonition: (props: {
    type: 'note' | 'tip' | 'caution' | 'beta'
    status?: string
    children: ReactNode & { props?: { children?: ReactNode } }
  }) => {
    const { type, children } = props

    const content = children?.props?.children || children

    return (
      <div className="my-5">
        {type === 'beta' && props.status ? (
          <Admonition type="beta" status={props.status}>
            {content}
          </Admonition>
        ) : (
          <Admonition type={type as 'note' | 'tip' | 'caution'}>
            {content}
          </Admonition>
        )}
      </div>
    )
  },
  Table: (props: ComponentProps<typeof Table>) => {
    return (
      <div className="my-5 -mr-8 grid">
        <Table hasShadow>{props.children}</Table>
      </div>
    )
  },
  TableHead: (props: ComponentProps<typeof TableHead>) => {
    return <TableHead {...props} />
  },
  TableHeader: (props: ComponentProps<typeof TableHeader>) => {
    return <TableHeader {...props} />
  },
  TableContent: (props: ComponentProps<typeof TableContent>) => {
    return <TableContent {...props} />
  },
  TableRow: (props: ComponentProps<typeof TableRow>) => {
    return <TableRow {...props} />
  },
  TableCell: (props: ComponentProps<typeof TableCell>) => {
    return <TableCell {...props} />
  },
  AwaitedList: (props: { children: ReactElement<{ children: ReactNode }> }) => {
    return baseComponents.ol({
      ...props,
      children: props.children.props.children,
      parent: 'AwaitedList',
    })
  },
  ...iconComponents,
}

export const legalComponents = {
  ...baseComponents,
  p: (props: Parameters<typeof baseComponents.p>[0]) => {
    return baseComponents.p({ ...props, className: 'my-6' })
  },
  h2: (props: ComponentProps<'h2'>) => {
    return <>{baseComponents.h2({ ...props, className: 'mb-4 mt-6' })}</>
  },
}

import { renderText } from '~/app/_utils/render-text'

export function Table(props: {
  hasShadow?: boolean
  children: [
    React.ReactElement<typeof TableHead>,
    React.ReactElement<typeof TableContent>,
  ]
}) {
  const { hasShadow = false, children } = props

  const table = (
    <div className="w-min overflow-hidden rounded-16 border border-white-12">
      <table className="w-[640px] group-[.group]:max-w-[calc(640px-2rem)]">
        {children}
      </table>
    </div>
  )

  return (
    <div className="overflow-x-auto">
      <div className="w-fit max-[542px]:pb-4 max-[542px]:pr-12">
        {hasShadow ? (
          <div className="w-min rounded-16 shadow-sm">{table}</div>
        ) : (
          table
        )}
      </div>
    </div>
  )
}

export function TableHead(props: {
  children: React.ReactElement<typeof TableCell>[]
}) {
  const { children } = props

  return (
    <thead>
      <tr className="border-b border-white-12 bg-white-8">{children}</tr>
    </thead>
  )
}

export function TableContent(props: {
  children: React.ReactElement<typeof TableRow>[]
}) {
  const { children } = props

  return <tbody>{children}</tbody>
}

export function TableRow(props: {
  children:
    | React.ReactElement<typeof TableCell>
    | React.ReactElement<typeof TableCell>[]
}) {
  const { children } = props

  return (
    <tr className="border-b border-white-12 last:border-b-0">{children}</tr>
  )
}

export function TableHeader(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <th className="whitespace-nowrap px-3 py-2 text-left">
      {renderText({
        children,
        size: 'text-16',
        weight: 'font-500',
        color: 'text-neutral-50',
      })}
    </th>
  )
}

export function TableCell(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <td className="px-3 py-2 align-top">
      {renderText({ children, size: 'text-14' })}
    </td>
  )
}

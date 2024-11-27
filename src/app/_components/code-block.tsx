'use client'

import { cx } from 'cva'
import { useEffect, useState } from 'react'
import { onlyText } from 'react-children-utilities'
import { Check, Copy } from '../_icons'
import { useCopyToClipboard } from '../(with-navigation)/docs/_hooks/use-copy-to-clipboard'

export function CodeBlock(props: React.ComponentProps<'figure'>) {
  const [, copy] = useCopyToClipboard()

  const code = onlyText(props.children)

  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setTimeout(() => setSuccess(false), 1500)
  }, [success])

  return (
    <div>
      <div className="relative my-5 grid scrollbar-none [&>pre]:max-h-[624px] [&>pre]:rounded-12 [&>pre]:bg-white-8 [&>pre]:p-6">
        <div className="absolute right-3 top-3 block" data-theme="dark">
          <button
            onClick={() => {
              copy(code)
              setSuccess(true)
            }}
            className={cx(
              'inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-1 text-center outline-none transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-default',
              success ? 'text-green' : 'text-white-95',
            )}
            aria-label="Copy code"
          >
            {success ? <Check /> : <Copy />}
          </button>
        </div>
        {props.children}
      </div>
    </div>
  )
}

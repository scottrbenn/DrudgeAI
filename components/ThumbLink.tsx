'use client'
import { useState } from 'react'

interface Props {
  href: string
  src: string
  imgClassName: string
  wrapClassName?: string
  featured?: boolean
}

export default function ThumbLink({ href, src, imgClassName, wrapClassName, featured }: Props) {
  const [hidden, setHidden] = useState(false)
  if (hidden) return null
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={wrapClassName}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className={imgClassName}
        referrerPolicy="no-referrer"
        onError={() => setHidden(true)}
        loading={featured ? 'eager' : 'lazy'}
      />
    </a>
  )
}

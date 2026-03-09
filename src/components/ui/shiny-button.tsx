"use client"

import type React from "react"
import Link from "next/link"

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  href?: string
  className?: string
}

export function ShinyButton({ children, onClick, className = "", href, ...props }: ShinyButtonProps) {
    return (
        <>
            {href ? (
              <Link href={href} className={`shiny-cta ${className}`} onClick={onClick} {...(props as any)}>
                    <span>{children}</span>
                </Link>
            ) : (
              <button suppressHydrationWarning className={`shiny-cta ${className}`} onClick={onClick} {...props}>
                    <span>{children}</span>
                </button>
            )}
        </>
    )
}

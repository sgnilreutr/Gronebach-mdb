import type { ReactNode } from 'react'
import { TitleHeader } from './Header/TitleHeader'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div>
      <TitleHeader />
      <div>{children}</div>
    </div>
  )
}

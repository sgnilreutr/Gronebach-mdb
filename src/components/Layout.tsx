import type { ReactNode } from 'react'
import { TitleHeader } from './Header/TitleHeader'
import './Layout.scss'

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

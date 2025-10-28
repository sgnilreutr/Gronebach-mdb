import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export function useColorScheme() {
  const systemPrefersDark = useMediaQuery(
    {
      query: '(prefers-color-scheme: dark)',
    },
    undefined
  )
  const [isDark, setIsDark] = useState<boolean | undefined>(undefined)

  const handleSetIsDark = (newIsDark: boolean) => {
    localStorage.setItem('colorScheme', newIsDark.toString())
    setIsDark(newIsDark)
  }

  useEffect(() => {
    const localIsDark = localStorage.getItem('colorScheme')
    if (localIsDark !== null) {
      setIsDark(localIsDark === 'true')
    }
  }, [])

  const value = useMemo(() => (isDark === undefined ? !!systemPrefersDark : isDark), [isDark, systemPrefersDark])

  useEffect(() => {
    if (value) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    const elements = [
      'all',
      'back',
      'close-button',
      'mobile-menu-wrapper',
      'personal-link',
      'search-bar',
      'search',
      'skeleton',
      'title-container',
    ]
    elements.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        element.classList.toggle('dark', value)
        if (id === 'search') {
          console.error(`Element with id ${id} found`)
          // element.classList.toggle('search-dark', value)
        }
      } else {
        console.error(`Element with id ${id} not found`)
      }
    })
  }, [value])

  return {
    isDark: Boolean(value),
    setIsDark: handleSetIsDark,
  }
}

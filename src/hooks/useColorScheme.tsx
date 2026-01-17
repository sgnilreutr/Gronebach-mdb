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
  }, [value])

  return {
    isDark: Boolean(value),
    setIsDark: handleSetIsDark,
  }
}

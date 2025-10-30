import { useState, useEffect } from 'react'

type Breakpoint = number | `sm` | `md` | `lg` | `xl` | `2xl`

const tailwindBreakpoints: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

function determineBreakPointValue(breakpoint: Breakpoint) {
  if (typeof breakpoint === 'number') {
    return breakpoint
  } else {
    const derivedValue = tailwindBreakpoints[breakpoint]
    if (derivedValue === undefined) {
      return 0
    } else {
      return derivedValue
    }
  }
}

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const breakpointValue = determineBreakPointValue(breakpoint)

  const [isBelow, setIsBelow] = useState<boolean>(false)

  useEffect(() => {
    const checkWidth = () => {
      setIsBelow(window.innerWidth < breakpointValue)
    }

    checkWidth()
    window.addEventListener('resize', checkWidth)

    return () => window.removeEventListener('resize', checkWidth)
  }, [breakpointValue])

  return isBelow
}

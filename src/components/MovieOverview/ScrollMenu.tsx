import { useRef, useState, useEffect, type ReactNode, useCallback } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { classNames } from '../../utils/classNames'

interface ScrollMenuProps {
  children: ReactNode
  className?: string
}

export function ScrollMenu({ children, className = '' }: ScrollMenuProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }, [])

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return

    const resizeObserver = new ResizeObserver(checkScroll)
    resizeObserver.observe(el)

    return () => resizeObserver.disconnect()
  }, [checkScroll])

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return

    const scrollAmount = el.clientWidth * 0.8
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <div className={classNames('relative group', className)}>
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/40 dark:bg-neutral-800/40 hover:dark:bg-neutral-700 hover:bg-white shadow-lg rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 ml-1'
          aria-label='Scroll left'
          type='button'>
          <div className='mr-1'>
            <FaChevronLeft size={30} />
          </div>
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className='flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-4 lg:py-8 overflow-y-hidden'
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
        {children}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/40 dark:bg-neutral-800/40 hover:dark:bg-neutral-700 hover:bg-white shadow-lg rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 mr-1'
          aria-label='Scroll right'
          type='button'>
          <div className='ml-1'>
            <FaChevronRight size={30} />
          </div>
        </button>
      )}
    </div>
  )
}

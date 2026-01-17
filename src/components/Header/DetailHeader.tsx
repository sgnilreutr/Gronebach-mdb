import type { Movie } from '../../data/dataTypes'
import { useBreakpoint } from '../../hooks/useBreakPoint'
import { BackButton } from '../Elements/BackButton'
import { RandomButton } from '../Elements/RandomButton'
import { Searchbutton } from '../Elements/SearchButton'
import { SeeAllButton } from '../Elements/SeeAllButton'

export function DetailHeader({ allMovies }: { allMovies: Array<Movie> }) {
  const isTabletOrMobile = useBreakpoint('md')

  if (isTabletOrMobile) {
    return (
      <div className='fixed bottom-5 z-[1000] px-3 w-full'>
        <div className='flex gap-3 flex-row justify-between'>
          <div className='rounded-full bg-white/10 backdrop-blur-lg border border-white/15 text-white font-medium hover:bg-white/15 hover:border-white/25 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl p-3 md:hidden'>
            <BackButton />
          </div>
          <div className='rounded-full bg-white/10 backdrop-blur-lg border border-white/15 text-white font-medium hover:bg-white/15 hover:border-white/25 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl p-3 md:hidden flex gap-3 items-center justify-center'>
            <SeeAllButton />
            <Searchbutton />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='pb-[1.4rem] grid grid-cols-3 px-3 md:px-0'>
        <div className='justify-start items-center flex'>
          <BackButton />
        </div>
        <RandomButton allMovies={allMovies} />
        <div className='flex flex-row items-center gap-3 justify-end'>
          <SeeAllButton />
          <Searchbutton />
        </div>
      </div>
    )
  }
}

import type { Movie } from '../../data/dataTypes'
import { RandomButton } from '../Elements/RandomButton'
import { Searchbutton } from '../Elements/SearchButton'
import { SeeAllButton } from '../Elements/SeeAllButton'
import { HeaderOptions } from './HeaderOptions'

export function Overviewheader({ allMovies }: { allMovies: Array<Movie> }) {
  return (
    <div className='pb-[1.4rem] grid grid-cols-3 px-3 md:px-0 items-center'>
      <div className='hidden md:block'>
        <HeaderOptions />
      </div>
      <div className='block md:hidden' />
      <RandomButton allMovies={allMovies} />
      <div className='flex-row items-center gap-3 justify-end hidden md:flex'>
        <SeeAllButton />
        <Searchbutton />
      </div>
    </div>
  )
}

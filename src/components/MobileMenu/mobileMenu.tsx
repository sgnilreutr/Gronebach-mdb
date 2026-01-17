import { Searchbutton } from '../Elements/SearchButton'
import { SeeAllButton } from '../Elements/SeeAllButton'
import { HeaderOptions } from '../Header/HeaderOptions'

export function MobileMenu() {
  return (
    <div className='fixed bottom-5 z-[1000] px-3 w-full'>
      <div className='flex gap-3 flex-row'>
        <div className='flex-1 rounded-full bg-white/10 backdrop-blur-lg border border-white/15 text-white font-medium hover:bg-white/15 hover:border-white/25 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl px-1 pb-2 pt-3 md:hidden'>
          <HeaderOptions />
        </div>
        <div className='rounded-full bg-white/10 backdrop-blur-lg border border-white/15 text-white font-medium hover:bg-white/15 hover:border-white/25 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl p-3 md:hidden flex gap-3 items-center justify-center'>
          <SeeAllButton />
          <Searchbutton />
        </div>
      </div>
    </div>
  )
}

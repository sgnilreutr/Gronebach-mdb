import './OverviewHeader.scss'
import { RandomButton } from '../Elements/RandomButton'
import { Searchbutton } from '../Elements/SearchButton'
import { SeeAllButton } from '../Elements/SeeAllButton'
import { HeaderOptions } from './HeaderOptions'

export function Overviewheader() {
  return (
    <div className="overviewheader-container">
      <div className="hide_on_mobile">
        <HeaderOptions />
      </div>
      <div className="placeholder" />
      <RandomButton />
      <div className="options-container">
        <SeeAllButton />
        <Searchbutton />
      </div>
    </div>
  )
}

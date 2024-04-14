import './DetailHeader.scss'
import { BackButton } from '../Elements/BackButton'
import { RandomButton } from '../Elements/RandomButton'
import { Searchbutton } from '../Elements/SearchButton'
import { SeeAllButton } from '../Elements/SeeAllButton'

export function DetailHeader() {
  return (
    <div className="buttons-container">
      <BackButton />
      <RandomButton />
      <div className="options-container-detail">
        <SeeAllButton />
        <Searchbutton />
      </div>
    </div>
  )
}

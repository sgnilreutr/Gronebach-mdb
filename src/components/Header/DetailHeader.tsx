import './DetailHeader.scss'
import { BackButton } from '../Elements/BackButton'
import { RandomButton } from '../Elements/RandomButton'
import { Searchbutton } from '../Elements/SearchButton'
import { SeeAllButton } from '../Elements/SeeAllButton'
import { TitleHeader } from './TitleHeader'

export function DetailHeader() {
  return (
    <div>
      <TitleHeader />
      <div className="buttons-container">
        <BackButton />
        <RandomButton />
        <div className="options-container-detail">
          <SeeAllButton />
          <Searchbutton />
        </div>
      </div>
    </div>
  )
}

import type { Movie } from '../../data/dataTypes'
import { DetailHeader } from '../Header/DetailHeader'

const MISSING_TITLES = [
  'Attack on the Queen',
  'De Ondergrondse Vergeet Niet',
  'De Oorlog van de Eeuw 1',
  'De Oorlog van de Eeuw 2',
  'De Oorlog van de Eeuw 3',
  'De Oorlog van de Eeuw 4',
  'De Oorlog van de Eeuw 5',
  'De Oorlog van de Eeuw 6',
  's Werelds mooiste nationale parken Afrika en Europa',
  's Werelds mooiste nationale parken Azie en Oceanie',
  'Slag om Arnhem',
  'When the Party is over',
]

const MISSING_HEADER = 'Ontbrekende titels'
const MISSING_SUB = 'Onderstaande titels konden online niet gevonden worden.'

export default function MissingTitles({ allMovies }: { allMovies: Array<Movie> }) {
  return (
    <div>
      <DetailHeader allMovies={allMovies} />
      <div>
        <h1>
          {MISSING_HEADER}{' '}
          <span role='img' aria-label='magnifying_glass_tilted_right'>
            🔍
          </span>
        </h1>
        <p>{MISSING_SUB}</p>
        {MISSING_TITLES.map((title) => (
          <li key={title.substr(0, 4)} className='list-none px-1'>
            {title}
          </li>
        ))}
      </div>
    </div>
  )
}

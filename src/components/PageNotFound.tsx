import { DetailHeader } from './Header/DetailHeader'

const NOT_FOUND = 'Uh, oh! Deze pagina bestaat niet.'

export default function PageNotFound() {
  return (
    <div>
      <DetailHeader />
      <h1>{NOT_FOUND}</h1>
    </div>
  )
}

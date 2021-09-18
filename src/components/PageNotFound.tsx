import React from 'react'
import DetailHeader from './Header/DetailHeader'

const NOT_FOUND = 'Uh, oh! Deze pagina bestaat niet.'

const PageNotFound = () => (
  <div>
    <DetailHeader />
    <h1>{NOT_FOUND}</h1>
  </div>
)

export default PageNotFound

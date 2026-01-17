import { MovieProvider } from './context/MovieDatabaseContext'
import { RoutesHandeler } from './routes'

export function App() {
  return (
    <MovieProvider>
      <div className='container mx-auto'>
        <RoutesHandeler />
      </div>
    </MovieProvider>
  )
}

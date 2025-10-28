import './App.scss'
import { MovieProvider } from './context/MovieDatabaseContext'
import { RoutesHandeler } from './routes'

export function App() {
  return (
    <MovieProvider>
      <div className='App' id='App'>
        <RoutesHandeler />
      </div>
    </MovieProvider>
  )
}

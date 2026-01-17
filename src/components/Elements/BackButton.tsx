import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routeConstants'

const BACK_TO_HOME = 'Terug'

const preLoadHomepage = () => {
  import('../Homepage/Homepage')
}

export function BackButton() {
  const navigate = useNavigate()

  function navigateBack() {
    navigate(ROUTES.homepage)
  }
  return (
    <button
      className='flex flex-row items-center justify-center cursor-pointer bg-transparent border-none dark:text-white text-neutral-800'
      onClick={navigateBack}
      onFocus={preLoadHomepage}
      onMouseOver={preLoadHomepage}
      type='button'>
      <FiArrowLeft size={24} />
      <span className='whitespace-nowrap hidden md:block'>{BACK_TO_HOME}</span>
    </button>
  )
}

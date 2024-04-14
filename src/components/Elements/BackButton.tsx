import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import './BackButton.scss'
import { ROUTES } from '../../constants/routeConstants'

const BACK_TO_HOME = 'Terug naar homepage'

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
      className="back-button"
      onClick={navigateBack}
      onFocus={preLoadHomepage}
      onMouseOver={preLoadHomepage}
      type="button"
    >
      <FiArrowLeft style={{ stroke: '#8d8d8d' }} size={24} />
      <div className="back" id="back">
        <span>{BACK_TO_HOME}</span>
      </div>
    </button>
  )
}

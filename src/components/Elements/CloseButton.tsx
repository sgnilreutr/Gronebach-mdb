import { FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export function CloseButton() {
  const navigate = useNavigate()
  const returnPage = () => {
    navigate(-1)
  }

  return (
    <button
      onClick={returnPage}
      className='bg-white dark:!bg-neutral-800 p-2 rounded-full border-0 flex items-center justify-center cursor-pointer transition-all ease-in-out duration-100 hover:bg-color-text-dm dark:hover:!bg-color-text-lm'
      type='button'>
      <FiX size={24} />
    </button>
  )
}

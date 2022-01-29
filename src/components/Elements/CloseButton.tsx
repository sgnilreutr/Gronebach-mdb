import React from 'react'
import { FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import './CloseButton.scss'

export default function Closebutton() {
  const navigate = useNavigate()
  const returnPage = () => {
    navigate(-1)
  }

  return (
    <div className="close-button-container">
      <button
        onClick={returnPage}
        className="close-button"
        type="button"
        id="close-button"
      >
        <FiX size={24} />
      </button>
    </div>
  )
}

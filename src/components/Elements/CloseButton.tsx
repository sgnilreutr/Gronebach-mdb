import React from 'react'
import { FiX } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import './CloseButton.scss'

export default function Closebutton() {
  const history = useHistory()
  const returnPage = () => {
    history.go(-1)
  }

  return (
    <div className="close-button-container">
      <button onClick={returnPage} className="close-button" type="button">
        <FiX size={24} />
      </button>
    </div>
  )
}

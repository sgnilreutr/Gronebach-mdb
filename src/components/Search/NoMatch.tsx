import React from 'react'

const NOTIFICATION_INFO = 'Deze titel kan ik niet vinden. Druk op deze knop om een notificatie naar de beheerder te sturen.'

export default function Nomatch() {
  // function GrabData() {
  //   //grab data from send query and mail to robberttg@protonmail.com
  // }

  return (
    <div>
      <span>
        {NOTIFICATION_INFO}
      </span>
      {/* <button onClick={() => GrabData()}> Stuur notificatie</button> */}
    </div>
  )
}

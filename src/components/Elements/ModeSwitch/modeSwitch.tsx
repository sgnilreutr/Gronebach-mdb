import Toggle from 'react-toggle'

import 'react-toggle/style.css'
import { useColorScheme } from '../../../hooks/useColorScheme'
import Moon from '../../../img/moon.png'
import Sun from '../../../img/sun.png'
import './modeSwitch.scss'

export function ModeSwitch() {
  const { isDark, setIsDark } = useColorScheme()

  return (
    <div>
      <Toggle
        checked={isDark}
        onChange={(event) => setIsDark(event.target.checked)}
        icons={{
          checked: <img className='mode_switch_img' src={Moon} alt='Moon' />,
          unchecked: <img className='mode_switch_img' src={Sun} alt='Sun' />,
        }}
        aria-label='Dark mode'
      />
    </div>
  )
}

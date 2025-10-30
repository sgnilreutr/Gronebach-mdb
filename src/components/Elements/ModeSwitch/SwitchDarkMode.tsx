import * as SwitchPrimitives from '@radix-ui/react-switch'
import { useColorScheme } from '../../../hooks/useColorScheme'

export function SwitchDarkMode() {
  const { isDark, setIsDark } = useColorScheme()

  return (
    <div className='flex items-center group'>
      <label
        className='pr-[15px] text-[15px] leading-none dark:text-gray-200 group-hover:opacity-100 md:opacity-0 transition-opacity ease-in-out'
        htmlFor='airplane-mode'>
        {isDark ? 'Activate Light mode' : 'Activate Dark mode'}
      </label>
      <SwitchPrimitives.Root
        checked={isDark}
        onCheckedChange={(checked) => setIsDark(checked)}
        aria-label='Dark mode'
        title='Toggle Dark and Light mode'
        className='relative h-[25px] w-[42px] cursor-default rounded-full bg-gray-300 outline-none data-[state=checked]:bg-gray-700'
        id='dark-mode'>
        <SwitchPrimitives.Thumb className='block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-200 will-change-transform data-[state=checked]:translate-x-[19px]' />
      </SwitchPrimitives.Root>
    </div>
  )
}

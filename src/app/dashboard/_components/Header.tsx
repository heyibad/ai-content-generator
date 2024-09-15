import ThemeToggle from '@/app/_components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Search, UserRoundPlus } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='bg-white p-2 py-5 md:p-5  shadow-sm border-b-2 flex justify-between items-center gap-1 md:gap-4 dark:bg-[#18181B] dark:text-white'>
      <div className="flex items-center rounded-3xl gap-2 md:gap-8 py-2 px-4 md:px-6 border max-w-72 md:max-w-xl">
        <Search className='w-4 '/>
        <input type="text" placeholder="Search" className="outline-none pl-4 md:pl-0 w-44 md:w-full"/>
      </div>
      <div className="pl-2 flex items-center justify-center">
        <ThemeToggle className='mx-3 ' />
      <Button
  className='rounded-3xl text-sm h-10'>
  <span className="inline md:hidden">
    <UserRoundPlus/>
  </span>
  <span className="hidden md:inline">🔥Join Membership for $9.99/Month</span>
</Button>

      </div>        
    </div>
  )
}

export default Header
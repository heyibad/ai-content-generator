import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='p-2 py-5 md:p-5  shadow-sm border-b-2 flex justify-between items-center gap-4'>
      <div className="flex items-center rounded-3xl gap-8 py-2 px-6 border max-w-xl">
        <Search className='w-4'/>
        <input type="text" placeholder="Search" className="outline-none"/>
      </div>
      <div className="pl-2">
      <Button
  className='rounded-3xl text-sm h-10'>
  <span className="inline">🔥Join Membership</span>
  <span className="hidden md:inline"> for $9.99/Month</span>
</Button>

      </div>        
    </div>
  )
}

export default Header
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='p-5 shadow-sm border-b-2 flex justify-between items-center'>
      <div className="flex items-center rounded-md gap-2 p-2 border max-w-xl">
        <Search/>
        <input type="text" placeholder="Search" className="outline-none"/>
      </div>
      <div className="pl-2">
       <Button
       className='rounded-2xl text-sm h-8'
       >🔥 Join Membership for $9.99/Month</Button>
      </div>
    </div>
  )
}

export default Header
"use client"
import React, {useState} from 'react'
import SearchSection from './_components/SearchSection'
import TemplateList from './_components/TemplateList'

function Dashboard() {
  const [search, setSearch] = useState<string>('')
  
  return (
    <div>
      <SearchSection setSearch={(value)=>{
       setSearch(value)
      }}/>
      <TemplateList search={search}/>
    </div>
  )
}

export default Dashboard
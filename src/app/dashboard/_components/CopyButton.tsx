"use client"
import { Button } from '@/components/ui/button'
import React from 'react'

const CopyButton = ({value}:{value:string}) => {
  return (
    <Button size="sm"
    onClick={()=>window.navigator.clipboard.writeText(value)}
    >COPY</Button>
  )
}

export default CopyButton
'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function ThemeToggle({className}:{className?:string}) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
    className={className}
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-[1.3rem] w-[1.3rem]" />
      ) : (
        <Moon className="h-[1.3rem] w-[1.3rem]" />
      )}
    </Button>
  )
}
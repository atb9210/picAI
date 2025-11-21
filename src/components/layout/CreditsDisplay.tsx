'use client'

import { useState, useEffect } from 'react'
import { Coins } from 'lucide-react'

export default function CreditsDisplay() {
  const [credits, setCredits] = useState<number>(50)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await fetch('/api/credits')
        if (response.ok) {
          const data = await response.json()
          setCredits(data.credits)
        }
      } catch (error) {
        console.error('Failed to fetch credits:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCredits()
    
    // Refresh ogni 30 secondi
    const interval = setInterval(fetchCredits, 30000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) return <div className="animate-pulse h-8 w-20 bg-gray-200 rounded" />

  return (
    <div className="flex items-center gap-2 bg-purple-100 px-3 py-2 rounded-lg">
      <Coins className="w-5 h-5 text-purple-600" />
      <span className="font-semibold text-purple-900">{credits}</span>
    </div>
  )
}
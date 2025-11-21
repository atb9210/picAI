'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Plus, Share2, Edit, User } from 'lucide-react'

export default function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const getActiveTab = () => {
    if (pathname === '/') return 'modifica-ai'
    if (pathname === '/galleria') return 'galleria'
    if (pathname === '/crea-ai') return 'crea-ai'
    if (pathname === '/profilo') return 'profilo'
    return 'modifica-ai'
  }

  const activeTab = getActiveTab()

  const handleTabClick = (tab: 'crea-ai' | 'galleria' | 'modifica-ai' | 'profilo') => {
    switch (tab) {
      case 'crea-ai':
        router.push('/crea-ai')
        break
      case 'galleria':
        router.push('/galleria')
        break
      case 'modifica-ai':
        router.push('/')
        break
      case 'profilo':
        router.push('/profilo')
        break
    }
  }

  return (
    <div className="h-15 bg-white border-t border-gray-200 flex justify-around items-center flex-shrink-0">
      <button 
        onClick={() => handleTabClick('crea-ai')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'crea-ai' ? 'text-purple-600' : 'text-gray-500'}`}
      >
        <Plus className="w-6 h-6" />
        <span className="text-xs">Crea AI</span>
      </button>
      <button 
        onClick={() => handleTabClick('galleria')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'galleria' ? 'text-purple-600' : 'text-gray-500'}`}
      >
        <Share2 className="w-6 h-6" />
        <span className="text-xs">Galleria</span>
      </button>
      <button 
        onClick={() => handleTabClick('modifica-ai')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'modifica-ai' ? 'text-purple-600' : 'text-gray-500'}`}
      >
        <Edit className="w-6 h-6" />
        <span className="text-xs">Modifica AI</span>
      </button>
      <button 
        onClick={() => handleTabClick('profilo')}
        className={`flex flex-col items-center gap-1 ${activeTab === 'profilo' ? 'text-purple-600' : 'text-gray-500'}`}
      >
        <User className="w-6 h-6" />
        <span className="text-xs">Profilo</span>
      </button>
    </div>
  )
}
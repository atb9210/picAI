'use client'

import { useState } from 'react'
import { 
  AddPhotoAlternate, 
  PhotoLibrary, 
  Edit, 
  Person,
  Search,
  ArrowDropDown,
  Add,
  Share,
  SignalCellularAlt,
  Wifi,
  BatteryFull
} from 'lucide-react'

interface MobileLayoutProps {
  children: React.ReactNode
  activeTab: 'crea-ai' | 'galleria' | 'modifica-ai' | 'profilo'
}

const navigation = [
  { id: 'crea-ai', label: 'Crea AI', icon: AddPhotoAlternate },
  { id: 'galleria', label: 'Galleria', icon: PhotoLibrary },
  { id: 'modifica-ai', label: 'Modifica AI', icon: Edit },
  { id: 'profilo', label: 'Profilo', icon: Person },
]

export default function MobileLayout({ children, activeTab }: MobileLayoutProps) {
  const [currentTime, setCurrentTime] = useState('9:41')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      {/* Phone Frame Container */}
      <div className="w-full max-w-md mx-auto">
        {/* Outer Decorative Frame */}
        <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 rounded-[2.5rem] p-3 shadow-2xl">
          {/* Floating Shapes */}
          <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-400 rounded-full opacity-20"></div>
            <div className="absolute top-1/2 -right-8 w-20 h-20 bg-green-400 rounded-full opacity-20"></div>
          </div>

          {/* Title Section */}
          <div className="text-center py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">PicAI</h1>
            <p className="text-lg opacity-90">La tua galleria di immagini modificate</p>
          </div>

          {/* Phone Screen */}
          <div className="relative bg-white rounded-[2rem] overflow-hidden" style={{ minHeight: '600px' }}>
            {/* Status Bar */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 flex justify-between items-center text-xs">
              <span className="font-medium">{currentTime}</span>
              <div className="flex items-center gap-1">
                <SignalCellularAlt className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <BatteryFull className="w-3 h-3" />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto pb-16">
                {children}
              </div>

              {/* Bottom Navigation */}
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
                <div className="flex justify-around py-2">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = item.id === activeTab
                    
                    return (
                      <button
                        key={item.id}
                        className="flex flex-col items-center py-2 px-3 text-xs transition-colors"
                        style={{ color: isActive ? '#6a11cb' : '#9ca3af' }}
                      >
                        <Icon className="w-6 h-6 mb-1" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
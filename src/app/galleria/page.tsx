'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Edit, Share2, Download, ChevronDown } from 'lucide-react'
import AppHeader from '@/components/layout/AppHeader'
import AppBottomNav from '@/components/layout/AppBottomNav'

interface GalleryImage {
  id: string
  thumbnailUrl: string
  fullSizeUrl: string
  style: string
  timestamp: Date
  isLoading?: boolean
}

export default function Galleria() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState('Tutti')
  const [sortBy, setSortBy] = useState('Data')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isViewingFullSize, setIsViewingFullSize] = useState(false)
  const [showFabMenu, setShowFabMenu] = useState(false)
  
  // Immagini di esempio con miniature (150x150) e full-size (800x800)
  const [images] = useState<GalleryImage[]>([
    { 
      id: '1', 
      thumbnailUrl: 'https://picsum.photos/seed/anime1/150/150.jpg', 
      fullSizeUrl: 'https://picsum.photos/seed/anime1/800/800.jpg', 
      style: 'Anime', 
      timestamp: new Date('2024-01-15') 
    },
    { 
      id: '2', 
      thumbnailUrl: 'https://picsum.photos/seed/ghibli2/150/150.jpg', 
      fullSizeUrl: 'https://picsum.photos/seed/ghibli2/800/800.jpg', 
      style: 'Ghibli', 
      timestamp: new Date('2024-01-14') 
    },
    { 
      id: '3', 
      thumbnailUrl: 'https://picsum.photos/seed/pixar3/150/150.jpg', 
      fullSizeUrl: 'https://picsum.photos/seed/pixar3/800/800.jpg', 
      style: 'Pixar', 
      timestamp: new Date('2024-01-13') 
    },
    { 
      id: '4', 
      thumbnailUrl: 'https://picsum.photos/seed/cartoon4/150/150.jpg', 
      fullSizeUrl: 'https://picsum.photos/seed/cartoon4/800/800.jpg', 
      style: 'Cartoon', 
      timestamp: new Date('2024-01-12') 
    },
    { 
      id: '5', 
      thumbnailUrl: 'https://picsum.photos/seed/3d5/150/150.jpg', 
      fullSizeUrl: 'https://picsum.photos/seed/3d5/800/800.jpg', 
      style: '3D', 
      timestamp: new Date('2024-01-11') 
    },
    { 
      id: '6', 
      thumbnailUrl: 'https://picsum.photos/seed/anime6/150/150.jpg', 
      fullSizeUrl: 'https://picsum.photos/seed/anime6/800/800.jpg', 
      style: 'Anime', 
      timestamp: new Date('2024-01-10') 
    },
    { 
      id: '7', 
      thumbnailUrl: 'https://picsum.photos/seed/ghibli7/150/150.jpg', 
      fullSizeUrl: 'https://picsum.photos/seed/ghibli7/800/800.jpg', 
      style: 'Ghibli', 
      timestamp: new Date('2024-01-09') 
    },
    { 
      id: '8', 
      thumbnailUrl: 'https://picsum.photos/seed/pixar8/150/150.jpg', 
      fullSizeUrl: 'https://picsum.photos/seed/pixar8/800/800.jpg', 
      style: 'Pixar', 
      timestamp: new Date('2024-01-08') 
    },
    { 
      id: '9', 
      thumbnailUrl: 'https://picsum.photos/seed/cartoon9/150/150.jpg', 
      fullSizeUrl: 'https://picsum.photos/seed/cartoon9/800/800.jpg', 
      style: 'Cartoon', 
      timestamp: new Date('2024-01-07') 
    },
    { 
      id: '10', 
      thumbnailUrl: 'https://picsum.photos/seed/3d10/150/150.jpg', 
      fullSizeUrl: 'https://picsum.photos/seed/3d10/800/800.jpg', 
      style: '3D', 
      timestamp: new Date('2024-01-06') 
    },
    { 
      id: '11', 
      thumbnailUrl: 'https://picsum.photos/seed/anime11/150/150.jpg', 
      fullSizeUrl: 'https://picsum.photos/seed/anime11/800/800.jpg', 
      style: 'Anime', 
      timestamp: new Date('2024-01-05') 
    },
    { 
      id: '12', 
      thumbnailUrl: 'https://picsum.photos/seed/ghibli12/150/150.jpg', 
      fullSizeUrl: 'https://picsum.photos/seed/ghibli12/800/800.jpg', 
      style: 'Ghibli', 
      timestamp: new Date('2024-01-04') 
    },
  ])

  const filters = ['Tutti', 'Ghibli', 'Pixar', 'Anime', 'Cartoon', '3D']
  
  const filteredImages = activeFilter === 'Tutti' 
    ? images 
    : images.filter(img => img.style === activeFilter)

  const handleShare = async (imageUrl: string) => {
    try {
      const whatsappUrl = `https://wa.me/?text=Guarda questa immagine modificata con PicAI! ${imageUrl}`
      window.open(whatsappUrl, '_blank')
    } catch (error) {
      console.error('Share failed:', error)
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(imageUrl)
          alert('Link copiato negli appunti! Puoi incollarlo su WhatsApp.')
        } catch (clipboardError) {
          alert('Impossibile condividere. Copia il link manualmente.')
        }
      }
    }
  }

  const handleDownload = async (imageUrl: string, fileName: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image)
    setIsViewingFullSize(true)
  }

  const handleCloseFullSize = () => {
    setIsViewingFullSize(false)
    setSelectedImage(null)
  }

  const handleFabClick = () => {
    console.log('FAB clicked - current state:', showFabMenu)
    setShowFabMenu(!showFabMenu)
  }

  const handleCreateImage = () => {
    setShowFabMenu(false)
    // Navigate to create AI page using Next.js router
    router.push('/crea-ai')
  }

  const handleEditImage = () => {
    setShowFabMenu(false)
    // Navigate to modify AI page using Next.js router
    router.push('/')
  }

  return (
    <div className="h-screen flex flex-col max-w-2xl mx-auto bg-white">
      <AppHeader title="Galleria" icon="photo_library" credits={150} />
      
      {/* Gallery Container */}
      <div className="flex-1 p-5 overflow-y-auto bg-gray-50">
        {/* Filter Chips */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        {/* Sort and Count */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">
            {filteredImages.length} immagini
          </span>
          <button className="flex items-center gap-1 bg-white px-3 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-sm hover:shadow-md">
            {sortBy}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-20">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => handleImageClick(image)}
              className="relative rounded-xl overflow-hidden aspect-square shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src={image.thumbnailUrl}
                alt={`Immagine ${image.style}`}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2.5 text-white">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold">
                    {image.style}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownload(image.fullSizeUrl, `picai-${image.style}-${image.id}.jpg`)
                      }}
                      className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      title="Scarica"
                    >
                      <Download className="w-3.5 h-3.5 text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleShare(image.fullSizeUrl)
                      }}
                      className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      title="Condividi"
                    >
                      <Share2 className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* FAB Button with Menu */}
        <div className="fixed bottom-20 right-5 z-50">
          <button 
            onClick={handleFabClick}
            className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative z-10"
          >
            <Plus className={`w-7 h-7 transition-transform duration-300 ${showFabMenu ? 'rotate-45' : ''}`} />
          </button>
          
          {/* Dropdown Menu */}
          {showFabMenu && (
            <div 
              className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden min-w-[200px] z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCreateImage}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <Plus className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Crea immagine</span>
              </button>
              <button
                onClick={handleEditImage}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <Edit className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Modifica immagine</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Full Size Modal */}
      {isViewingFullSize && selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={handleCloseFullSize}
        >
          <div 
            className="relative max-w-4xl max-h-full bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {selectedImage.style}
              </h3>
              <button
                onClick={handleCloseFullSize}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Image */}
            <div className="p-4">
              <img
                src={selectedImage.fullSizeUrl}
                alt={`Immagine ${selectedImage.style}`}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>
            
            {/* Actions */}
            <div className="flex justify-center gap-4 p-4 border-t bg-gray-50">
              <button
                onClick={() => handleDownload(selectedImage.fullSizeUrl, `picai-${selectedImage.style}-${selectedImage.id}.jpg`)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                Scarica
              </button>
              <button
                onClick={() => handleShare(selectedImage.fullSizeUrl)}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Condividi
              </button>
            </div>
          </div>
        </div>
      )}
      
      <AppBottomNav />
    </div>
  )
}
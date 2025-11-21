'use client'

import { useState } from 'react'
import { 
  Search, 
  ArrowDropDown, 
  Add, 
  Edit, 
  Share,
  PhotoLibrary
} from 'lucide-react'

interface GalleryImage {
  id: string
  url: string
  style: string
  createdAt: Date
}

interface GalleryProps {
  onNavigate?: (tab: string) => void
}

const filters = [
  'Tutti',
  'Ghibli', 
  'Pixar',
  'Anime',
  'Cartoon',
  '3D'
]

const mockImages: GalleryImage[] = [
  { id: '1', url: 'https://picsum.photos/seed/anime1/300/300.jpg', style: 'Anime', createdAt: new Date() },
  { id: '2', url: 'https://picsum.photos/seed/ghibli2/300/300.jpg', style: 'Ghibli', createdAt: new Date() },
  { id: '3', url: 'https://picsum.photos/seed/pixar3/300/300.jpg', style: 'Pixar', createdAt: new Date() },
  { id: '4', url: 'https://picsum.photos/seed/cartoon4/300/300.jpg', style: 'Cartoon', createdAt: new Date() },
  { id: '5', url: 'https://picsum.photos/seed/3d5/300/300.jpg', style: '3D', createdAt: new Date() },
  { id: '6', url: 'https://picsum.photos/seed/anime6/300/300.jpg', style: 'Anime', createdAt: new Date() },
]

export default function Gallery({ onNavigate }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState('Tutti')
  const [sortBy, setSortBy] = useState('Data')

  const filteredImages = activeFilter === 'Tutti' 
    ? mockImages 
    : mockImages.filter(img => img.style === activeFilter)

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PhotoLibrary className="w-6 h-6" />
          <h1 className="text-xl font-bold">Galleria</h1>
        </div>
        <Search className="w-5 h-5 cursor-pointer" />
      </div>

      {/* Gallery Content */}
      <div className="flex-1 p-4 pb-20">
        {/* Filter Chips */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 shadow-sm'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Sort and Count */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600 text-sm">
            {filteredImages.length} immagini
          </span>
          <button 
            onClick={() => setSortBy(sortBy === 'Data' ? 'Nome' : 'Data')}
            className="flex items-center gap-1 bg-white px-3 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm"
          >
            {sortBy}
            <ArrowDropDown className="w-4 h-4" />
          </button>
        </div>

        {/* Images Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {filteredImages.map((image) => (
              <div key={image.id} className="relative group cursor-pointer">
                <div className="aspect-square rounded-xl overflow-hidden shadow-md">
                  <img 
                    src={image.url} 
                    alt={image.style}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                    <span className="text-white text-xs font-semibold">
                      {image.style}
                    </span>
                    <div className="flex gap-1">
                      <button className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <Edit className="w-3 h-3 text-white" />
                      </button>
                      <button className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <Share className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
              <PhotoLibrary className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nessuna immagine trovata
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Inizia creando la tua prima immagine AI
            </p>
            <button 
              onClick={() => onNavigate?.('crea-ai')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg"
            >
              Crea Immagine
            </button>
          </div>
        )}
      </div>

      {/* FAB Button */}
      <button 
        onClick={() => onNavigate?.('crea-ai')}
        className="absolute bottom-20 right-4 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg z-10"
      >
        <Add className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}
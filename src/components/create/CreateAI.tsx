'use client'

import { useState } from 'react'
import { 
  Wand2, 
  Image as ImageIcon, 
  Settings,
  AddPhotoAlternate
} from 'lucide-react'

interface CreateAIProps {
  onNavigate?: (tab: string) => void
}

const styles = [
  { value: 'photographic', label: 'Fotografico' },
  { value: 'anime', label: 'Anime' },
  { value: 'ghibli', label: 'Ghibli' },
  { value: 'pixar', label: 'Pixar' },
  { value: 'cartoon', label: 'Cartoon' },
  { value: '3d', label: '3D' },
]

const inspirationExamples = [
  { prompt: 'Un gatto con un cappello da mago', style: 'cartoon' },
  { prompt: 'Paesaggio montano all\'alba', style: 'photographic' },
  { prompt: 'Città futuristica con macchine volanti', style: 'anime' },
]

export default function CreateAI({ onNavigate }: CreateAIProps) {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('photographic')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const creditsNeeded = 5

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    try {
      const response = await fetch('/api/images/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style,
          ratio: '1:1',
          creativity: 75,
          detail: 60,
        }),
      })
      
      if (!response.ok) throw new Error('Generation failed')
      
      const result = await response.json()
      console.log('Generated:', result)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AddPhotoAlternate className="w-6 h-6" />
          <h1 className="text-xl font-bold">Crea AI</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-20 overflow-y-auto">
        {/* Main Input */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Descrivi l'immagine
          </label>
          <textarea
            placeholder="Descrivi l'immagine che vuoi creare..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[80px] text-sm"
          />
        </div>

        {/* Style Selection */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Stile dell'immagine
          </label>
          <div className="grid grid-cols-3 gap-2">
            {styles.map((s) => (
              <button
                key={s.value}
                onClick={() => setStyle(s.value)}
                className={`p-3 rounded-xl text-xs font-medium transition-all ${
                  style === s.value
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="text-sm font-semibold text-gray-700">
              Impostazioni avanzate
            </span>
            <Settings className="w-4 h-4 text-gray-500" />
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Creatività: 75%
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  defaultValue="75"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Dettaglio: 60%
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  defaultValue="60"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Proporzioni
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                  <option>Quadrato 1:1</option>
                  <option>Panoramico 16:9</option>
                  <option>Verticale 9:16</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-700 font-medium">
              Questa generazione richiede {creditsNeeded} crediti
            </span>
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block" />
                  Generazione...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 inline-block mr-2" />
                  Crea immagine
                </>
              )}
            </button>
          </div>
        </div>

        {/* Inspiration */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <ImageIcon className="w-4 h-4 mr-2" />
            Ispirazione
          </h3>
          <div className="space-y-2">
            {inspirationExamples.map((example, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-3 hover:border-purple-300 cursor-pointer transition-colors"
                onClick={() => {
                  setPrompt(example.prompt)
                  setStyle(example.style)
                }}
              >
                <div className="aspect-square bg-gray-100 rounded-lg mb-2"></div>
                <p className="text-xs text-gray-700 line-clamp-2">{example.prompt}</p>
                <p className="text-xs text-purple-600 mt-1 font-medium">{example.style}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
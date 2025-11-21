'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ImageMessage } from '@/components/ImageMessage'
import AppHeader from '@/components/layout/AppHeader'
import AppBottomNav from '@/components/layout/AppBottomNav'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  image?: string
  isGenerating?: boolean
}

export default function Home() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Ciao! Sono PicAI, il tuo assistente per la modifica delle immagini. Carica una foto e dimmi cosa vorresti cambiare!',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
        
        // Add AI message about the uploaded image
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: 'Ho ricevuto la tua immagine! Ora dimmi come vorresti modificarla.',
          sender: 'ai',
          timestamp: new Date()
        }])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')

    // Add AI processing message
    setTimeout(() => {
      const processingMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sto elaborando la tua richiesta...',
        sender: 'ai',
        timestamp: new Date(),
        isGenerating: true
      }
      
      setMessages(prev => [...prev, processingMessage])
      setIsGenerating(true)

      // Simulate image generation
      setTimeout(() => {
        // Remove processing message and add completion message
        setMessages(prev => prev.filter(msg => msg.id !== processingMessage.id))
        
        const completionMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: 'Perfetto! Ho trasformato la tua immagine come richiesto.',
          sender: 'ai',
          timestamp: new Date(),
          image: 'https://picsum.photos/seed/generated' + Date.now() + '/400/400.jpg'
        }
        
        setMessages(prev => [...prev, completionMessage])
        setGeneratedImage('https://picsum.photos/seed/generated' + Date.now() + '/400/400.jpg')
        setIsGenerating(false)
      }, 3000)
    }, 500)
  }

  const handleStyleClick = (style: string) => {
    const styleMessage: Message = {
      id: Date.now().toString(),
      text: `Applico lo stile ${style} alla tua immagine...`,
      sender: 'ai',
      timestamp: new Date(),
      isGenerating: true
    }
    
    setMessages(prev => [...prev, styleMessage])
    setIsGenerating(true)

    // Simulate style application
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== styleMessage.id))
      
      const completionMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Stile ${style} applicato con successo!`,
        sender: 'ai',
        timestamp: new Date(),
        image: 'https://picsum.photos/seed/' + style + Date.now() + '/400/400.jpg'
      }
      
      setMessages(prev => [...prev, completionMessage])
      setGeneratedImage('https://picsum.photos/seed/' + style + Date.now() + '/400/400.jpg')
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="h-screen flex flex-col max-w-2xl mx-auto bg-gray-50">
      <AppHeader title="Modifica AI" icon="edit" credits={150} />
      
      {/* Chat Container */}
      <div className="flex-1 p-5 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className={`flex items-start mb-4 ${message.sender === 'user' ? 'justify-end' : ''}`}>
            {message.sender === 'ai' && (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-center mr-3 flex-shrink-0">
                {message.isGenerating ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
            )}
            
            <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-1' : ''}`}>
              <div className={`p-3 rounded-2xl shadow-sm ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none'
              }`}>
                {message.text}
              </div>
              
              {message.image && (
                <div className="mt-3">
                  <ImageMessage imageData={message.image} />
                  <div className="flex justify-between items-center mt-3 px-3">
                    <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            {message.sender === 'user' && (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-red-500 text-white flex items-center justify-center ml-3 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
        ))}
        
        {/* Upload Area - Only show if no image is uploaded */}
        {!uploadedImage && (
          <div className="bg-white border-2 border-dashed border-purple-600 rounded-2xl p-8 text-center mb-4 shadow-sm">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <svg 
              className="w-12 h-12 text-purple-600 mx-auto mb-2 cursor-pointer" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
              onClick={() => fileInputRef.current?.click()}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div className="text-purple-600 font-semibold mb-1">Carica un'immagine</div>
            <div className="text-gray-500 text-sm">Trascina o clicca per selezionare</div>
          </div>
        )}
        
        {/* Style Buttons - Only show if image is uploaded */}
        {uploadedImage && !isGenerating && (
          <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <div className="text-sm font-semibold text-gray-700 mb-3">Scegli uno stile:</div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleStyleClick('Ghibli')}
                className="px-4 py-2 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-green-400 to-cyan-300"
              >
                Ghibli
              </button>
              <button 
                onClick={() => handleStyleClick('Pixar')}
                className="px-4 py-2 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-pink-400 to-yellow-300"
              >
                Pixar
              </button>
              <button 
                onClick={() => handleStyleClick('Anime')}
                className="px-4 py-2 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-cyan-300 to-purple-900"
              >
                Anime
              </button>
              <button 
                onClick={() => handleStyleClick('Cartoon')}
                className="px-4 py-2 rounded-full text-gray-800 font-semibold text-sm bg-gradient-to-r from-blue-200 to-pink-200"
              >
                Cartoon
              </button>
            </div>
          </div>
        )}
        
        {/* Uploaded Image Preview */}
        {uploadedImage && (
          <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <div className="text-sm font-semibold text-gray-700 mb-3">Immagine caricata:</div>
            <img src={uploadedImage} alt="Uploaded" className="w-full rounded-lg" />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center gap-2 flex-shrink-0">
        <input 
          type="text" 
          placeholder="Descrivi cosa vuoi modificare..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={isGenerating}
        />
        <button 
          onClick={handleSendMessage}
          disabled={!inputText.trim() || isGenerating}
          className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-center shadow-md disabled:opacity-50"
        >
          {isGenerating ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </div>
      
      <AppBottomNav />
    </div>
  )
}
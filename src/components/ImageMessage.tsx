'use client';

import { Download, Share2 } from 'lucide-react';
import { useState } from 'react';

interface ImageMessageProps {
  imageData: string;
  isUser?: boolean;
  fileName?: string;
}

export function ImageMessage({ imageData, isUser = false, fileName = "picai-image.jpg" }: ImageMessageProps) {
  const [isSharing, setIsSharing] = useState(false);

  // Convert URL or data URL to blob for better sharing compatibility
  const dataURLToBlob = async (urlOrDataUrl: string): Promise<Blob> => {
    // If it's already a data URL, convert it
    if (urlOrDataUrl.startsWith('data:')) {
      const arr = urlOrDataUrl.split(',');
      const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }
    
    // If it's a regular URL, fetch it
    const response = await fetch(urlOrDataUrl);
    return await response.blob();
  };

  const handleDownload = async () => {
    try {
      // Create blob from image data using our improved function
      const blob = await dataURLToBlob(imageData);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleShare = async () => {
    try {
      // Try to open WhatsApp with the image URL
      const whatsappUrl = `https://wa.me/?text=Guarda questa immagine modificata con PicAI! ${imageData}`;
      
      // Try to open in new tab first
      window.open(whatsappUrl, '_blank');
      
    } catch (error) {
      console.error('Share failed:', error);
      
      // Fallback: copy URL to clipboard
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(imageData);
          alert('Link copiato negli appunti! Puoi incollarlo su WhatsApp.');
        } catch (clipboardError) {
          alert('Impossibile condividere. Copia il link manualmente.');
        }
      } else {
        alert('Impossibile condividere. Copia il link manualmente.');
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Immagine con pulsante condivisione */}
      <div className="relative rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
        <img
          src={imageData}
          alt="Immagine generata"
          className="w-full h-auto"
          style={{ maxHeight: '400px', objectFit: 'contain' }}
        />
        
        {/* Pulsanti download e condivisione */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            onClick={handleDownload}
            className="p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-all duration-200"
            title="Scarica immagine"
          >
            <Download className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-all duration-200 disabled:opacity-50"
            title="Condividi immagine"
          >
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
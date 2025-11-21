"use client"

import { useState } from "react"
import AppHeader from "@/components/layout/AppHeader"
import AppBottomNav from "@/components/layout/AppBottomNav"

export default function CreaAI() {
  const [prompt, setPrompt] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("Fotografico")
  const [creativity, setCreativity] = useState(75)
  const [detail, setDetail] = useState(60)
  const [dimension, setDimension] = useState("1:1")
  const [showStyleModal, setShowStyleModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  const credits = 150
  const creditsNeeded = 5

  const suggestions = [
    "Un gatto astronauta",
    "Paesaggio fantasy",
    "Ritratto cyberpunk",
    "Città futuristica",
  ]

  const examples = [
    { url: "https://picsum.photos/seed/aiexample1/300/300.jpg", caption: "Un castello su una nuvola" },
    { url: "https://picsum.photos/seed/aiexample2/300/300.jpg", caption: "Ritratto di un robot antico" },
    { url: "https://picsum.photos/seed/aiexample3/300/300.jpg", caption: "Foresta magica notturna" },
    { url: "https://picsum.photos/seed/aiexample4/300/300.jpg", caption: "Città sottomarina futuristica" },
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    try {
      const response = await fetch("/api/images/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style: selectedStyle, ratio: dimension, creativity, detail }),
      })
      if (!response.ok) throw new Error("Generation failed")
      const result = await response.json()
      console.log("Generated:", result)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="app-container">
      <AppHeader title="Crea AI" icon="add_photo_alternate" credits={credits} />

      <div className="create-container">
        <div className="prompt-section">
          <h3 className="section-title">
            <i className="material-icons">description</i>
            Descrivi l'immagine
          </h3>
          <textarea
            className="prompt-textarea"
            placeholder="Descrivi l'immagine che vuoi creare..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="suggestions">
            {suggestions.map((s) => (
              <div key={s} className="suggestion-chip" onClick={() => setPrompt(s)}>
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="credits-needed">
          <i className="material-icons">info</i>
          <span>
            Crediti necessari: <span className="credits-amount">{creditsNeeded}</span>
          </span>
        </div>

        <button className="create-button" onClick={handleGenerate} disabled={!prompt.trim()}>
          <i className="material-icons">auto_awesome</i>
          Crea immagine
        </button>

        <div className="settings-row">
          <div className="settings-card" id="styleCard" onClick={() => setShowStyleModal(true)}>
            <div className="settings-card-header">
              <div className="settings-card-icon">
                <i className="material-icons">brush</i>
              </div>
              <div className="settings-card-title">Stile</div>
            </div>
            <div className="settings-card-feedback">
              <div className="feedback-item">
                <i className="material-icons">photo_camera</i>
                <span>
                  Stile: <span className="feedback-value">{selectedStyle}</span>
                </span>
              </div>
              <div className="feedback-item">
                <i className="material-icons">aspect_ratio</i>
                <span>
                  Formato: <span className="feedback-value">{dimension}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="settings-card" id="settingsCard" onClick={() => setShowSettingsModal(true)}>
            <div className="settings-card-header">
              <div className="settings-card-icon">
                <i className="material-icons">tune</i>
              </div>
              <div className="settings-card-title">Impostazioni</div>
            </div>
            <div className="settings-card-feedback">
              <div className="feedback-item">
                <i className="material-icons">auto_awesome</i>
                <span>
                  Creatività: <span className="feedback-value">{creativity}%</span>
                </span>
              </div>
              <div className="feedback-item">
                <i className="material-icons">high_quality</i>
                <span>
                  Dettaglio: <span className="feedback-value">{detail}%</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="examples-section">
          <h3 className="section-title">
            <i className="material-icons">lightbulb</i>
            Ispirazione
          </h3>
          <div className="examples-grid">
            {examples.map((ex, idx) => (
              <div key={idx} className="example-item" onClick={() => setPrompt(ex.caption)}>
                <img src={ex.url} alt={`Esempio ${idx + 1}`} />
                <div className="example-overlay">"{ex.caption}"</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={showStyleModal ? "modal-overlay active" : "modal-overlay"} onClick={(e) => { if (e.currentTarget === e.target) setShowStyleModal(false) }}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">
              <i className="material-icons">brush</i>
              Scegli lo stile
            </h3>
            <button className="modal-close" onClick={() => setShowStyleModal(false)}>
              <i className="material-icons">close</i>
            </button>
          </div>
          <div className="modal-content">
            <div className="style-options">
              {[
                { name: "Fotografico", icon: "photo_camera" },
                { name: "Pittura", icon: "palette" },
                { name: "Disegno", icon: "edit" },
                { name: "Fantasy", icon: "auto_awesome" },
              ].map((opt) => (
                <div
                  key={opt.name}
                  className={`style-option ${selectedStyle === opt.name ? "active" : ""}`}
                  onClick={() => setSelectedStyle(opt.name)}
                >
                  <div className="style-icon">
                    <i className="material-icons">{opt.icon}</i>
                  </div>
                  <div className="style-name">{opt.name}</div>
                </div>
              ))}
            </div>

            <div className="dimensions-container">
              {[
                { label: "Quadrato", value: "1:1" },
                { label: "Ritratto", value: "4:5" },
                { label: "Panoramica", value: "16:9" },
              ].map((d) => (
                <div
                  key={d.value}
                  className={`dimension-option ${dimension === d.value ? "active" : ""}`}
                  onClick={() => setDimension(d.value)}
                >
                  <div className="dimension-label">{d.label}</div>
                  <div className="dimension-value">{d.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={showSettingsModal ? "modal-overlay active" : "modal-overlay"} onClick={(e) => { if (e.currentTarget === e.target) setShowSettingsModal(false) }}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">
              <i className="material-icons">tune</i>
              Impostazioni avanzate
            </h3>
            <button className="modal-close" onClick={() => setShowSettingsModal(false)}>
              <i className="material-icons">close</i>
            </button>
          </div>
          <div className="modal-content">
            <div className="slider-container">
              <div className="slider-label">
                <span className="slider-name">Creatività</span>
                <span className="slider-value">{creativity}%</span>
              </div>
              <input type="range" className="slider" min={0} max={100} value={creativity} onChange={(e) => setCreativity(parseInt(e.target.value))} />
            </div>
            <div className="slider-container">
              <div className="slider-label">
                <span className="slider-name">Dettaglio</span>
                <span className="slider-value">{detail}%</span>
              </div>
              <input type="range" className="slider" min={0} max={100} value={detail} onChange={(e) => setDetail(parseInt(e.target.value))} />
            </div>
          </div>
        </div>
      </div>

      <AppBottomNav />

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Quicksand', sans-serif; background: #f8f9fa; }
        .app-container { width: 100%; height: 100vh; max-width: 42rem; background: #ffffff; display: flex; flex-direction: column; overflow: hidden; margin: 0 auto; }
        .app-header { height: 70px; background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%); display: flex; align-items: center; justify-content: space-between; padding: 0 20px; color: white; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
        .app-title { font-size: 24px; font-weight: 700; display: flex; align-items: center; }
        .app-title .material-icons { margin-right: 10px; }
        .credits-indicator { display: flex; align-items: center; background: rgba(255, 255, 255, 0.2); padding: 6px 12px; border-radius: 20px; }
        .credits-indicator .material-icons { margin-right: 6px; font-size: 18px; }
        .credits-text { font-weight: 600; font-size: 14px; }
        .create-container { flex: 1; padding: 20px; overflow-y: auto; background: #f8f9fa; display: flex; flex-direction: column; }
        .prompt-section { background: white; border-radius: 20px; padding: 20px; margin-bottom: 15px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); }
        .section-title { font-size: 18px; font-weight: 600; color: #333; margin-bottom: 15px; display: flex; align-items: center; }
        .section-title .material-icons { margin-right: 8px; color: #6a11cb; }
        .prompt-textarea { width: 100%; min-height: 100px; padding: 15px; border: 2px solid #e0e0e0; border-radius: 15px; font-size: 16px; font-family: 'Quicksand', sans-serif; resize: none; outline: none; transition: border-color 0.3s; }
        .prompt-textarea:focus { border-color: #6a11cb; }
        .suggestions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .suggestion-chip { padding: 6px 12px; border-radius: 15px; background: #f0f2f5; color: #666; font-size: 14px; cursor: pointer; transition: all 0.3s ease; }
        .suggestion-chip:hover { background: #e0e0e0; }
        .credits-needed { display: flex; align-items: center; justify-content: center; margin: 15px 0; font-size: 14px; color: #666; }
        .credits-needed .material-icons { margin-right: 5px; color: #6a11cb; font-size: 16px; }
        .credits-amount { font-weight: 600; color: #6a11cb; }
        .create-button { width: 100%; padding: 16px; border-radius: 15px; background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); border: none; color: white; font-weight: 700; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(106, 17, 203, 0.3); margin-bottom: 15px; transition: all 0.3s ease; }
        .create-button:hover { transform: translateY(-2px); box-shadow: 0 6px 12px rgba(106, 17, 203, 0.4); }
        .create-button .material-icons { margin-right: 8px; font-size: 22px; }
        .settings-row { display: flex; gap: 15px; margin-bottom: 15px; }
        .settings-card { flex: 1; background: white; border-radius: 20px; padding: 15px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); cursor: pointer; transition: all 0.3s ease; position: relative; overflow: hidden; }
        .settings-card:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); }
        .settings-card-header { display: flex; align-items: center; margin-bottom: 10px; }
        .settings-card-icon { width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); display: flex; align-items: center; justify-content: center; margin-right: 12px; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(106, 17, 203, 0.4);} 70% { box-shadow: 0 0 0 10px rgba(106, 17, 203, 0);} 100% { box-shadow: 0 0 0 0 rgba(106, 17, 203, 0);} }
        .settings-card-icon .material-icons { font-size: 24px; color: white; }
        .settings-card-title { font-size: 16px; font-weight: 600; color: #333; }
        .settings-card-feedback { display: flex; flex-direction: column; gap: 5px; margin-top: 10px; }
        .feedback-item { display: flex; align-items: center; font-size: 14px; color: #555; }
        .feedback-item .material-icons { font-size: 16px; margin-right: 5px; color: #6a11cb; }
        .feedback-value { font-weight: 600; color: #333; }
        .examples-section { background: white; border-radius: 20px; padding: 15px; margin-bottom: 15px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); }
        .examples-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .example-item { position: relative; border-radius: 15px; overflow: hidden; aspect-ratio: 1; cursor: pointer; }
        .example-item img { width: 100%; height: 100%; object-fit: cover; }
        .example-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent); padding: 10px; color: white; font-size: 12px; }
        .nav-bar { height: 60px; background: white; display: flex; justify-content: space-around; align-items: center; border-top: 1px solid #eee; }
        .nav-item { display: flex; flex-direction: column; align-items: center; color: #888; }
        .nav-item.active { color: #6a11cb; }
        .nav-icon { font-size: 24px; }
        .nav-text { font-size: 12px; margin-top: 4px; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; opacity: 0; visibility: hidden; transition: opacity 0.3s, visibility 0.3s; }
        .modal-overlay.active { opacity: 1; visibility: visible; }
        .modal { background: white; border-radius: 20px; width: 90%; max-width: 500px; max-height: 80vh; overflow-y: auto; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); transform: translateY(20px); transition: transform 0.3s; }
        .modal-overlay.active .modal { transform: translateY(0); }
        .modal-header { padding: 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
        .modal-title { font-size: 20px; font-weight: 700; color: #333; display: flex; align-items: center; }
        .modal-title .material-icons { margin-right: 8px; color: #6a11cb; }
        .modal-close { width: 30px; height: 30px; border-radius: 50%; background: #f0f2f5; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #666; }
        .modal-content { padding: 20px; }
        .style-options { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .style-option { padding: 15px; border-radius: 15px; background: #f8f9fa; border: 2px solid transparent; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; }
        .style-option:hover { background: #f0f2f5; }
        .style-option.active { border-color: #6a11cb; background: rgba(106, 17, 203, 0.05); }
        .style-icon { width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); display: flex; align-items: center; justify-content: center; margin-right: 12px; }
        .style-icon .material-icons { font-size: 24px; color: white; }
        .style-name { font-weight: 600; color: #333; }
        .dimensions-container { display: flex; gap: 10px; margin-bottom: 15px; }
        .dimension-option { flex: 1; padding: 12px; border-radius: 12px; background: #f8f9fa; border: 2px solid transparent; text-align: center; cursor: pointer; transition: all 0.3s ease; }
        .dimension-option:hover { background: #f0f2f5; }
        .dimension-option.active { border-color: #6a11cb; background: rgba(106, 17, 203, 0.05); }
        .dimension-label { font-weight: 600; color: #333; margin-bottom: 4px; }
        .dimension-value { font-size: 14px; color: #666; }
        .slider-container { margin-bottom: 15px; }
        .slider-label { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .slider-name { font-weight: 600; color: #333; }
        .slider-value { color: #6a11cb; font-weight: 600; }
        .slider { width: 100%; height: 6px; border-radius: 3px; background: #e0e0e0; outline: none; -webkit-appearance: none; }
        .slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); cursor: pointer; }
        .slider::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); cursor: pointer; border: none; }
      `}</style>
    </div>
  )
}
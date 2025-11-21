"use client"

import Head from "next/head"
import { useState } from "react"
import AppHeader from "@/components/layout/AppHeader"
import AppBottomNav from "@/components/layout/AppBottomNav"

export default function Profilo() {
  const [qualitySpeed, setQualitySpeed] = useState(65)
  const [saveToGallery, setSaveToGallery] = useState(true)
  const [shareAnonymous, setShareAnonymous] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [showCreditsModal, setShowCreditsModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<{ credits: number; price: string; bonus: number; icon: string }>({ credits: 500, price: "19,99", bonus: 75, icon: "auto_awesome" })
  const [paymentMethod, setPaymentMethod] = useState<"Carta" | "PayPal" | "Apple Pay">("Carta")
  const [language, setLanguage] = useState("Italiano")
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"Bug" | "Suggerimento" | "Altro">("Bug")
  const [feedbackText, setFeedbackText] = useState("")
  const [supportSubject, setSupportSubject] = useState("")
  const [supportMessage, setSupportMessage] = useState("")

  const packages = [
    { credits: 100, price: "4,99", bonus: 10, icon: "stars" },
    { credits: 500, price: "19,99", bonus: 75, icon: "auto_awesome" },
    { credits: 1000, price: "34,99", bonus: 200, icon: "workspace_premium" },
  ]

  const totalSelectedCredits = selectedPackage.credits + selectedPackage.bonus

  return (
    <div className="app-container">
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <title>AI Chat Image Editor - Profilo</title>
      </Head>

      <AppHeader title="Profilo" icon="person" credits={150} />

      <div className="settings-container">
        <div className="intro-section">
          <h2 className="intro-title">Configura la tua app</h2>
          <p className="intro-text">Personalizza l'esperienza di modifica delle immagini secondo le tue preferenze</p>
        </div>

        <div className="settings-section">
          <h3 className="section-title">
            <i className="material-icons">tune</i>
            Bilanciamento Qualità/Velocità
          </h3>
          <div className="quality-balance">
            <div className="balance-labels">
              <span className="balance-label quality">Qualità</span>
              <span className="balance-label speed">Velocità</span>
            </div>
            <input
              type="range"
              className="balance-slider"
              min={0}
              max={100}
              value={qualitySpeed}
              onChange={(e) => setQualitySpeed(parseInt(e.target.value))}
            />
            <p className="balance-description">Attualmente bilanciato verso la qualità per risultati migliori</p>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="section-title">
            <i className="material-icons">account_balance_wallet</i>
            Crediti e Account
          </h3>
          <div className="credits-info">
            <div>
              <div className="credits-amount">150</div>
              <p style={{ fontSize: 14, color: "#666" }}>Crediti rimanenti</p>
            </div>
            <button className="buy-credits-button" onClick={() => setShowCreditsModal(true)}>
              <i className="material-icons">add_circle</i>
              Acquista
            </button>
          </div>
          <div className="plan-info" onClick={() => setShowPlanModal(true)}>
            <div className="plan-name">
              <i className="material-icons">workspace_premium</i>
              Piano Pro
            </div>
            <div className="plan-badge">Attivo</div>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="section-title">
            <i className="material-icons">lock</i>
            Privacy
          </h3>
          <div className="settings-item">
            <span className="settings-label">Salva immagini nella galleria</span>
            <div
              className={`toggle-switch ${saveToGallery ? "active" : ""}`}
              onClick={() => setSaveToGallery(!saveToGallery)}
            />
          </div>
          <div className="settings-item">
            <span className="settings-label">Condividi dati anonimi</span>
            <div
              className={`toggle-switch ${shareAnonymous ? "active" : ""}`}
              onClick={() => setShareAnonymous(!shareAnonymous)}
            />
          </div>
        </div>

        <div className="settings-section">
          <h3 className="section-title">
            <i className="material-icons">palette</i>
            Preferenze
          </h3>
          <div className="settings-item">
            <span className="settings-label">Lingua</span>
            <div
              className="language-selector"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            >
              {language}
              <i className="material-icons">arrow_drop_down</i>
              {showLanguageMenu && (
                <div className="language-menu" onClick={(e) => e.stopPropagation()}>
                  {['Italiano', 'Español', 'English'].map((opt) => (
                    <div
                      key={opt}
                      className={`language-option ${language === opt ? 'selected' : ''}`}
                      onClick={() => { setLanguage(opt); setShowLanguageMenu(false); }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="settings-item">
            <span className="settings-label">Tema</span>
            <div className="theme-selector">
              <div
                className={`theme-option light ${theme === "light" ? "active" : ""}`}
                onClick={() => setTheme("light")}
              >
                <i className="material-icons">light_mode</i>
              </div>
              <div
                className={`theme-option dark ${theme === "dark" ? "active" : ""}`}
                onClick={() => setTheme("dark")}
              >
                <i className="material-icons">dark_mode</i>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="section-title">
            <i className="material-icons">info</i>
            Informazioni
          </h3>
          <div className="action-buttons">
            <button className="action-button" onClick={() => setShowFeedbackModal(true)}>
              <i className="material-icons">feedback</i>
              Invia feedback
            </button>
            <button className="action-button" onClick={() => setShowSupportModal(true)}>
              <i className="material-icons">help</i>
              Aiuto e supporto
            </button>
            <button className="action-button" onClick={() => setShowInfoModal(true)}>
              <i className="material-icons">info</i>
              Informazioni sull'app
            </button>
          </div>
        </div>
      </div>

      <div
        className={showPlanModal ? "modal-overlay active" : "modal-overlay"}
        onClick={(e) => {
          if (e.currentTarget === e.target) setShowPlanModal(false)
        }}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">
              <i className="material-icons">workspace_premium</i>
              Scegli il tuo piano
            </h3>
            <button className="modal-close" onClick={() => setShowPlanModal(false)}>
              <i className="material-icons">close</i>
            </button>
          </div>
          <div className="modal-content">
            <div className="plan-cards">
              <div className="plan-card">
                <div className="plan-card-header">
                  <div className="plan-card-name">Base</div>
                  <div className="plan-card-price">Gratis</div>
                </div>
                <div className="plan-card-credits">50 crediti al mese</div>
                <div className="plan-features">
                  <div className="plan-feature">
                    <i className="material-icons">check_circle</i>
                    <span>Modifica immagini base</span>
                  </div>
                  <div className="plan-feature">
                    <i className="material-icons">check_circle</i>
                    <span>Stili standard</span>
                  </div>
                  <div className="plan-feature">
                    <i className="material-icons">check_circle</i>
                    <span>Risoluzione fino a 1024px</span>
                  </div>
                </div>
                <div className="plan-card-action">
                  <button className="plan-button secondary">Seleziona</button>
                </div>
              </div>
              <div className="plan-card active">
                <div className="plan-card-header">
                  <div className="plan-card-name">Pro</div>
                  <div className="plan-card-price">€9,99/mese</div>
                </div>
                <div className="plan-card-credits">500 crediti al mese</div>
                <div className="plan-features">
                  <div className="plan-feature">
                    <i className="material-icons">check_circle</i>
                    <span>Modifica immagini avanzata</span>
                  </div>
                  <div className="plan-feature">
                    <i className="material-icons">check_circle</i>
                    <span>Tutti gli stili premium</span>
                  </div>
                  <div className="plan-feature">
                    <i className="material-icons">check_circle</i>
                    <span>Risoluzione fino a 2048px</span>
                  </div>
                  <div className="plan-feature">
                    <i className="material-icons">check_circle</i>
                    <span>Processamento prioritario</span>
                  </div>
                </div>
                <div className="plan-card-action">
                  <button className="plan-button primary">Gestisci</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={showCreditsModal ? "modal-overlay active" : "modal-overlay"} onClick={(e) => {
        if (e.currentTarget === e.target) setShowCreditsModal(false)
      }}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">
              <i className="material-icons">account_balance_wallet</i>
              Acquista crediti
            </h3>
            <button className="modal-close" onClick={() => setShowCreditsModal(false)}>
              <i className="material-icons">close</i>
            </button>
          </div>
          <div className="modal-content">
            <div className="credits-packages">
              {packages.map((pkg) => {
                const selected = pkg.credits === selectedPackage.credits
                return (
                  <div
                    key={pkg.credits}
                    className={`credit-package ${selected ? "selected" : ""}`}
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    <div className="package-info">
                      <div className="package-icon">
                        <i className="material-icons">{pkg.icon}</i>
                      </div>
                      <div className="package-details">
                        <div className="package-credits">{pkg.credits} Crediti</div>
                        <div className="package-bonus">+{pkg.bonus} bonus</div>
                      </div>
                    </div>
                    <div className="package-price">€{pkg.price}</div>
                  </div>
                )
              })}
            </div>

            <div className="payment-methods">
              <div className="payment-title">Metodo di pagamento</div>
              <div className="payment-options">
                {[
                  { name: "Carta", icon: "credit_card" },
                  { name: "PayPal", icon: "account_balance" },
                  { name: "Apple Pay", icon: "apple" },
                ].map((opt) => (
                  <div
                    key={opt.name}
                    className={`payment-option ${paymentMethod === opt.name ? "selected" : ""}`}
                    onClick={() => setPaymentMethod(opt.name as any)}
                  >
                    <i className="material-icons payment-icon">{opt.icon}</i>
                    <div className="payment-name">{opt.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <button className="purchase-button">
              <i className="material-icons">shopping_cart</i>
              Acquista {totalSelectedCredits} crediti per €{selectedPackage.price}
            </button>
          </div>
        </div>
      </div>

      <AppBottomNav />

      <div
        className={showFeedbackModal ? "modal-overlay active" : "modal-overlay"}
        onClick={(e) => { if (e.currentTarget === e.target) setShowFeedbackModal(false) }}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">
              <i className="material-icons">feedback</i>
              Invia feedback
            </h3>
            <button className="modal-close" onClick={() => setShowFeedbackModal(false)}>
              <i className="material-icons">close</i>
            </button>
          </div>
          <div className="modal-content">
            <div className="feedback-types">
              {['Bug', 'Suggerimento', 'Altro'].map((t) => (
                <button
                  key={t}
                  className={`feedback-type ${feedbackType === t ? 'active' : ''}`}
                  onClick={() => setFeedbackType(t as any)}
                >
                  {t}
                </button>
              ))}
            </div>
            <textarea
              className="modal-textarea"
              placeholder="Descrivi il tuo feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <div className="modal-actions">
              <button className="action-btn secondary" onClick={() => setShowFeedbackModal(false)}>Annulla</button>
              <button className="action-btn primary" onClick={() => setShowFeedbackModal(false)}>Invia</button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={showSupportModal ? "modal-overlay active" : "modal-overlay"}
        onClick={(e) => { if (e.currentTarget === e.target) setShowSupportModal(false) }}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">
              <i className="material-icons">help</i>
              Aiuto e supporto
            </h3>
            <button className="modal-close" onClick={() => setShowSupportModal(false)}>
              <i className="material-icons">close</i>
            </button>
          </div>
          <div className="modal-content">
            <input
              className="modal-input"
              placeholder="Oggetto"
              value={supportSubject}
              onChange={(e) => setSupportSubject(e.target.value)}
            />
            <textarea
              className="modal-textarea"
              placeholder="Descrivi la richiesta di supporto..."
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
            />
            <div className="modal-actions">
              <button className="action-btn secondary" onClick={() => setShowSupportModal(false)}>Annulla</button>
              <button className="action-btn primary" onClick={() => setShowSupportModal(false)}>Invia</button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={showInfoModal ? "modal-overlay active" : "modal-overlay"}
        onClick={(e) => { if (e.currentTarget === e.target) setShowInfoModal(false) }}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">
              <i className="material-icons">info</i>
              Informazioni sull'app
            </h3>
            <button className="modal-close" onClick={() => setShowInfoModal(false)}>
              <i className="material-icons">close</i>
            </button>
          </div>
          <div className="modal-content">
            <div className="app-info">
              <div className="app-info-row"><span className="app-info-label">Nome</span><span className="app-info-value">PicAI</span></div>
              <div className="app-info-row"><span className="app-info-label">Versione</span><span className="app-info-value">1.0</span></div>
            </div>
            <div className="modal-actions">
              <button className="action-btn primary" onClick={() => setShowInfoModal(false)}>OK</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .app-container { width: 100%; height: 100vh; max-width: 42rem; background: #ffffff; display: flex; flex-direction: column; overflow: hidden; margin: 0 auto; font-family: 'Quicksand', sans-serif; }
        .app-header { height: 64px; background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%); display: flex; align-items: center; padding: 0 20px; color: white; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
        .app-title { font-size: 24px; font-weight: 700; margin-left: 10px; }
        .settings-container { flex: 1; padding: 20px; overflow-y: auto; background: #f8f9fa; display: flex; flex-direction: column; }
        .intro-section { margin-bottom: 20px; text-align: center; }
        .intro-title { font-size: 22px; font-weight: 700; color: #333; margin-bottom: 8px; }
        .intro-text { font-size: 16px; color: #666; line-height: 1.4; }
        .settings-section { background: white; border-radius: 20px; padding: 15px; margin-bottom: 15px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); }
        .section-title { font-size: 18px; font-weight: 600; color: #333; margin-bottom: 15px; display: flex; align-items: center; }
        .section-title .material-icons { margin-right: 8px; color: #6a11cb; }
        .quality-balance { display: flex; flex-direction: column; margin-bottom: 15px; }
        .balance-labels { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .balance-label { font-size: 14px; font-weight: 600; }
        .balance-label.quality { color: #6a11cb; }
        .balance-label.speed { color: #2575fc; }
        .balance-slider { width: 100%; height: 8px; border-radius: 4px; background: linear-gradient(to right, #6a11cb 0%, #2575fc 100%); outline: none; -webkit-appearance: none; margin-bottom: 8px; }
        .balance-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 50%; background: white; cursor: pointer; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); }
        .balance-slider::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: white; cursor: pointer; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); border: none; }
        .balance-description { font-size: 14px; color: #666; text-align: center; }
        .credits-info { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .credits-amount { font-size: 28px; font-weight: 700; color: #6a11cb; }
        .buy-credits-button { padding: 10px 15px; border-radius: 15px; background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); border: none; color: white; font-weight: 600; font-size: 14px; cursor: pointer; display: flex; align-items: center; }
        .buy-credits-button .material-icons { font-size: 18px; margin-right: 5px; }
        .plan-info { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding: 10px; border-radius: 12px; background: #f8f9fa; cursor: pointer; transition: background 0.3s; }
        .plan-info:hover { background: #f0f2f5; }
        .plan-name { font-size: 16px; font-weight: 600; color: #333; display: flex; align-items: center; }
        .plan-name .material-icons { margin-right: 5px; color: #6a11cb; font-size: 20px; }
        .plan-badge { padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; color: white; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
        .settings-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .settings-item:last-child { margin-bottom: 0; }
        .settings-label { font-size: 16px; color: #333; }
        .toggle-switch { position: relative; width: 50px; height: 26px; background-color: #ccc; border-radius: 13px; cursor: pointer; transition: background-color 0.3s; }
        .toggle-switch.active { background-color: #6a11cb; }
        .toggle-switch::after { content: ""; position: absolute; width: 22px; height: 22px; border-radius: 50%; background-color: white; top: 2px; left: 2px; transition: transform 0.3s; }
        .toggle-switch.active::after { transform: translateX(24px); }
        .language-selector { position: relative; display: flex; align-items: center; background: #f0f2f5; border-radius: 10px; padding: 8px 12px; cursor: pointer; }
        .language-selector .material-icons { margin-left: 5px; color: #6a11cb; }
        .language-menu { position: absolute; top: calc(100% + 6px); right: 0; background: white; border: 1px solid #eee; border-radius: 10px; box-shadow: 0 10px 20px rgba(0,0,0,0.12); min-width: 160px; z-index: 1200; overflow: hidden; }
        .language-option { padding: 10px 12px; font-size: 14px; color: #333; cursor: pointer; }
        .language-option:hover { background: #f8f9fa; }
        .language-option.selected { color: #6a11cb; font-weight: 600; }
        .theme-selector { display: flex; gap: 10px; }
        .theme-option { width: 40px; height: 40px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .theme-option.light { background: #f8f9fa; border: 2px solid #e0e0e0; }
        .theme-option.dark { background: #333; border: 2px solid #555; }
        .theme-option.active { border-color: #6a11cb; }
        .theme-option .material-icons { font-size: 20px; }
        .theme-option.light .material-icons { color: #333; }
        .theme-option.dark .material-icons { color: white; }
        .action-buttons { display: flex; flex-direction: column; gap: 10px; }
        .action-button { display: flex; align-items: center; padding: 12px; border-radius: 15px; background: #f0f2f5; border: none; color: #333; font-weight: 600; font-size: 16px; cursor: pointer; text-align: left; }
        .action-button .material-icons { margin-right: 10px; color: #6a11cb; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; opacity: 0; visibility: hidden; transition: opacity 0.3s, visibility 0.3s; }
        .modal-overlay.active { opacity: 1; visibility: visible; }
        .modal { background: white; border-radius: 20px; width: 90%; max-width: 560px; max-height: 80vh; overflow-y: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); transform: translateY(20px); transition: transform 0.3s; }
        .modal-overlay.active .modal { transform: translateY(0); }
        .modal-header { padding: 16px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
        .modal-title { font-size: 20px; font-weight: 700; color: #333; display: flex; align-items: center; }
        .modal-title .material-icons { margin-right: 8px; color: #6a11cb; }
        .modal-close { width: 30px; height: 30px; border-radius: 50%; background: #f0f2f5; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #666; }
        .modal-content { padding: 16px; }
        .plan-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .plan-card { border: 2px solid #e0e0e0; border-radius: 15px; padding: 12px; transition: all 0.3s; }
        .plan-card.active { border-color: #6a11cb; background: rgba(106, 17, 203, 0.05); }
        .plan-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .plan-card-name { font-size: 16px; font-weight: 700; color: #333; }
        .plan-card-price { font-size: 16px; font-weight: 700; color: #6a11cb; }
        .plan-card-credits { font-size: 13px; color: #666; margin-bottom: 8px; }
        .plan-features { margin-bottom: 12px; }
        .plan-feature { display: flex; align-items: center; margin-bottom: 6px; font-size: 13px; color: #333; }
        .plan-feature .material-icons { margin-right: 6px; color: #43e97b; font-size: 16px; }
        .plan-card-action { display: flex; justify-content: center; }
        .plan-button { padding: 8px 16px; border-radius: 10px; font-weight: 600; font-size: 13px; cursor: pointer; border: none; transition: all 0.3s; }
        .plan-button.primary { background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); color: white; }
        .plan-button.secondary { background: #f0f2f5; color: #333; }
        .plan-button:hover { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
        .credits-packages { display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px; }
        .credit-package { border: 2px solid #e0e0e0; border-radius: 15px; padding: 15px; display: flex; justify-content: space-between; align-items: center; transition: all 0.3s; cursor: pointer; }
        .credit-package:hover { border-color: #6a11cb; background: rgba(106, 17, 203, 0.05); }
        .credit-package.selected { border-color: #6a11cb; background: rgba(106, 17, 203, 0.05); }
        .package-info { display: flex; align-items: center; }
        .package-icon { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); display: flex; align-items: center; justify-content: center; margin-right: 15px; }
        .package-icon .material-icons { color: white; font-size: 20px; }
        .package-details { display: flex; flex-direction: column; }
        .package-credits { font-size: 18px; font-weight: 700; color: #333; }
        .package-bonus { font-size: 14px; color: #6a11cb; }
        .package-price { font-size: 18px; font-weight: 700; color: #6a11cb; }
        .payment-methods { margin-top: 20px; }
        .payment-title { font-size: 16px; font-weight: 600; color: #333; margin-bottom: 10px; }
        .payment-options { display: flex; gap: 10px; }
        .payment-option { flex: 1; padding: 10px; border: 2px solid #e0e0e0; border-radius: 10px; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: all 0.3s; }
        .payment-option:hover { border-color: #6a11cb; background: rgba(106, 17, 203, 0.05); }
        .payment-option.selected { border-color: #6a11cb; background: rgba(106, 17, 203, 0.05); }
        .payment-icon { font-size: 24px; color: #6a11cb; margin-bottom: 5px; }
        .payment-name { font-size: 12px; color: #333; }
        .purchase-button { width: 100%; padding: 15px; border-radius: 15px; background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); border: none; color: white; font-weight: 700; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; margin-top: 20px; transition: all 0.3s; }
        .purchase-button:hover { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(106, 17, 203, 0.3); }
        .purchase-button .material-icons { margin-right: 8px; }
        .feedback-types { display: flex; gap: 8px; margin-bottom: 12px; }
        .feedback-type { padding: 8px 12px; border-radius: 999px; background: #f0f2f5; color: #333; font-size: 14px; font-weight: 600; border: 2px solid transparent; cursor: pointer; }
        .feedback-type.active { background: rgba(106, 17, 203, 0.08); border-color: #6a11cb; color: #6a11cb; }
        .modal-input { width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 12px; font-size: 16px; margin-bottom: 12px; outline: none; }
        .modal-input:focus { border-color: #6a11cb; }
        .modal-textarea { width: 100%; min-height: 120px; padding: 12px; border: 2px solid #e0e0e0; border-radius: 12px; font-size: 16px; outline: none; resize: vertical; }
        .modal-textarea:focus { border-color: #6a11cb; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
        .action-btn { padding: 10px 16px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; border: none; }
        .action-btn.primary { background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); color: white; }
        .action-btn.secondary { background: #f0f2f5; color: #333; }
        .app-info { display: flex; flex-direction: column; gap: 10px; }
        .app-info-row { display: flex; justify-content: space-between; font-size: 15px; }
        .app-info-label { color: #666; }
        .app-info-value { color: #333; font-weight: 600; }
      `}</style>
    </div>
  )
}
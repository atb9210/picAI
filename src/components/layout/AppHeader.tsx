"use client"

import React from "react"

export default function AppHeader({ title, icon = "add_photo_alternate", credits = 150 }: { title: string; icon?: string; credits?: number }) {
  return (
    <div className="app-header">
      <div className="app-title">
        <i className="material-icons">{icon}</i>
        {title}
      </div>
      <div className="credits-indicator">
        <i className="material-icons">account_balance_wallet</i>
        <span className="credits-text">{credits} crediti</span>
      </div>
      <style jsx global>{`
        .app-header { height: 70px; background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%); display: flex; align-items: center; justify-content: space-between; padding: 0 20px; color: white; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
        .app-title { font-size: 24px; font-weight: 700; display: flex; align-items: center; }
        .app-title .material-icons { margin-right: 10px; }
        .credits-indicator { display: flex; align-items: center; background: rgba(255, 255, 255, 0.2); padding: 6px 12px; border-radius: 20px; }
        .credits-indicator .material-icons { margin-right: 6px; font-size: 18px; }
        .credits-text { font-weight: 600; font-size: 14px; }
      `}</style>
    </div>
  )
}
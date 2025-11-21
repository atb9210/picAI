"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"

const items = [
  { label: "Crea AI", href: "/crea-ai", icon: "add_photo_alternate" },
  { label: "Galleria", href: "/galleria", icon: "photo_library" },
  { label: "Modifica AI", href: "/", icon: "edit" },
  { label: "Profilo", href: "/profilo", icon: "person" },
]

export default function AppBottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="nav-bar">
      {items.map((item) => (
        <div
          key={item.href}
          className={`nav-item ${pathname === item.href ? "active" : ""}`}
          onClick={() => router.push(item.href)}
        >
          <i className="material-icons nav-icon">{item.icon}</i>
          <span className="nav-text">{item.label}</span>
        </div>
      ))}
      <style jsx global>{`
        .nav-bar { height: 60px; background: white; display: flex; justify-content: space-around; align-items: center; border-top: 1px solid #eee; }
        .nav-item { display: flex; flex-direction: column; align-items: center; color: #888; cursor: pointer; }
        .nav-item.active { color: #6a11cb; }
        .nav-icon { font-size: 24px; }
        .nav-text { font-size: 12px; margin-top: 4px; }
      `}</style>
    </div>
  )
}
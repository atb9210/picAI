## Obiettivo
Allineare la pagina `/crea-ai` esattamente all’HTML/CSS ora forniti in `designUI/CreaAI.md`, mantenendo React/Next.js e la coerenza con le altre pagine.

## Differenze chiave da applicare
1. **Header**
- Titolo con icona `add_photo_alternate` e `credits-indicator` a destra (badge “150 crediti”).

2. **Struttura contenuto**
- Prompt section con suggerimenti.
- Riga “Crediti necessari” (icona `info` + valore 5).
- Pulsante “Crea immagine” immediatamente sotto i crediti.
- **Settings row** con due card:
  - Card “Stile” con icona `brush` + **feedback**:
    - “Stile: Fotografico” (icona `photo_camera`)
    - “Formato: 1:1” (icona `aspect_ratio`)
  - Card “Impostazioni” con icona `tune` + **feedback**:
    - “Creatività: 75%” (icona `auto_awesome`)
    - “Dettaglio: 60%” (icona `high_quality`)
- Sezione Ispirazione con griglia 2x2 e overlay.
- Navbar in basso.

3. **Modali**
- Modal Stile: griglia delle 4 opzioni + selezione dimensioni (1:1, 4:5, 16:9).
- Modal Impostazioni: 2 slider (Creatività, Dettaglio) con percentuali aggiornate.
- Chiusura via close e overlay.

## Implementazione React
- Stato: `prompt`, `selectedStyle`, `dimension`, `creativity`, `detail`, `showStyleModal`, `showSettingsModal`.
- **Render feedback in card** usando direttamente gli state (nessun DOM manuale):
  - Card Stile: legge `selectedStyle` e `dimension`.
  - Card Impostazioni: legge `creativity` e `detail`.
- **Eventi**:
  - Click card → apre rispettivo modal.
  - Click opzione stile → `setSelectedStyle`.
  - Click dimensione → `setDimension`.
  - Slider → `setCreativity`/`setDetail` e aggiornano percentuali mostrate.
  - Suggerimenti → impostano `prompt`.
  - CTA → chiama `handleGenerate` (mantiene chiamata a `/api/images/generate`).

## CSS
- Inserire/aggiornare blocco CSS del design:
  - `.app-container` max-width 720px, `.app-header` 70px, gradienti e ombre.
  - **Nuove classi**: `.settings-card-feedback`, `.feedback-item`, `.feedback-value` con icone colore `#6a11cb` e tipografia conforme.
  - Mantieni `pulse` sull’icona card.
  - Stili modali e griglia opzioni identici.

## Rimozioni/Aggiustamenti
- Rimuovere le “preview-item” quadrate nelle card (il design attuale usa feedback testuali).
- Allineare l’ordine delle sezioni come nel file.

## Verifica
- Desktop/mobile: CTA visibile sopra la piega; feedback nelle card aggiornano in tempo reale al cambiare di stile/dimensione/slider.
- Apertura/chiusura modali fluida; overlay click chiude.

Confermi che procedo con questi aggiornamenti alla pagina `/crea-ai`?
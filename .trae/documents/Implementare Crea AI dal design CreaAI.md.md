## Obiettivo
Portare la pagina `/crea-ai` a seguire esattamente l’HTML/CSS del file `designUI/CreaAI.md`, adattandoli a React/Next.js mantenendo la coerenza con le altre pagine (BottomNavigation, App Router).

## Mappatura UI → React
- **Header**: titolo con icona `add_photo_alternate` e indicatore crediti (badge a destra) come da design.
- **Prompt section**: titolo con icona `description`, textarea controllata, chip di suggerimenti cliccabili.
- **Credits needed**: riga informativa con icona `info` e valore (es. 5) visibile sopra la CTA.
- **CTA “Crea immagine”**: pulsante principale subito sotto i crediti (stessa posizione del design), con hover/ombre.
- **Settings row**: due card (Stile, Impostazioni) con icone animate (pulse) e preview; all’atto del click aprono modali dedicati.
- **Esempi/Ispirazione**: griglia di 4 esempi con overlay testuale.
- **Bottom nav**: mantiene `BottomNavigation` come nelle altre pagine.

## Modali e Interazioni
- **Modal Stile**:
  - Opzioni `Fotografico`, `Pittura`, `Disegno`, `Fantasy` con icone e stato `active`.
  - Click su card stile apre il modal; click su close o overlay chiude.
  - Selezione stile aggiorna lo stato e la preview della card.
- **Modal Impostazioni**:
  - Slider controllati per Creatività (0–100) e Dettaglio (0–100) con aggiornamento percentuale.
  - Click su card impostazioni apre; close/overlay chiude.
- **Dimensioni** (nel modal stile): 1:1, 4:5, 16:9 con stato `active`.
- **Suggerimenti**: il click su ogni chip imposta il valore del prompt.
- **CTA**: disabilitata quando `prompt` è vuoto; onClick esegue `handleGenerate` (possibile collegamento all’endpoint già presente `/api/images/generate`).

## Stato e Logica
- Hook `useState` per: `prompt`, `credits` (statici per UI), `selectedStyle`, `selectedDimension`, `creativity`, `detail`, `showStyleModal`, `showSettingsModal`.
- Eventi: open/close modali, toggle `active` su opzioni, aggiornamento slider con display percentuale, impostazione prompt dai suggerimenti.

## CSS
- Inserire il blocco CSS del design tramite `<style jsx global>` nella pagina, **mantenendo esattamente**:
  - `max-width: 720px` per `.app-container`
  - gradienti, ombre, spaziature, `pulse` animation per icona card.
  - stili modali (overlay, container, header, contenuto) e griglia di opzioni.
- Assicurare che le classi (`.app-header`, `.create-container`, `.prompt-section`, `.settings-row`, `.modal-*`, etc.) corrispondano 1:1.
- Font: Material Icons e Quicksand sono già caricati globalmente nel `layout`; non aggiungere duplicati.

## Coerenza e Accessibilità
- Mantenere la navigazione e la gerarchia visiva coerenti con Profilo/Galleria.
- Dimensioni tap target ≥ 44–48px e contrasto elevato per CTA.
- Focus visibile sui controlli (textarea, slider, chip).

## Verifica
- Test desktop/mobile:
  - CTA visibile senza scroll (posizionata in alto come da design).
  - Apertura/chiusura modali (card/close/overlay) fluide.
  - Slider aggiornano la percentuale visualizzata.
  - Chip e selezioni aggiornano lo stato e la UI.

Confermi che procedo con l’implementazione esatta del design sulla pagina `/crea-ai`?
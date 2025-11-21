## Obiettivo
Eseguire commit e push “rebound” della codebase locale verso `atb9210/picAI`, usando il server MCP GitHub collegato, con backup preventivo della `main` remota.

## Passi
1. Preflight
- Verifica se esiste `.gitignore` per evitare il commit di `node_modules/`, `.next/`, log.
- Se manca, aggiungere `.gitignore` standard per Next.js/Node.
- Configura autore Git (nome/email) se necessario.

2. Commit Locale
- Inizializza repo (`git init`) se assente.
- Staging completo (`git add -A`).
- Commit unico descrittivo (UI allineata, header/nav globali, modali, design sync).
- Assicurare branch `main` locale (`git checkout -B main`).

3. Collegamento Remote
- Imposta `origin` su `https://github.com/atb9210/picAI.git`.
- `git fetch origin --prune`.

4. Backup Sicurezza della main remota
- Crea branch locale da `origin/main` (se esiste): `backup-main-YYYYMMDD`.
- Push del backup su remote.

5. Rebound
- `git push --force-with-lease origin main` per posizionare la `main` locale avanti alla remota.
- (Opzionale) `git push origin --tags`.

6. Verifica
- `git status`, `git log -n 3`, `git remote -v`.
- Controllo su GitHub della struttura e default branch.

## Rollback
- Se serve, ripristina da `backup-main-YYYYMMDD` (force push inverso).

Confermi che procedo eseguendo questi passi ora?
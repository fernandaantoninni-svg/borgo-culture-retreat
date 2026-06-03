# Borgo Cultura — Sito Web
 - Sito per visualizare: https://id-preview--9b99fd39-9bc8-489f-8ab8-cb51683d5e27.lovable.app/

Sito ufficiale (demo) della pousada **Borgo Cultura**, immersa tra gli ulivi delle colline di **Arezzo**, in Toscana.

> ⚠️ Tutti i dati di contatto (telefono, email, indirizzo, prezzi) sono **fittizi** — usati solo a scopo dimostrativo.

## ✨ Funzionalità

- **Home** con presentazione, camere e colazione in casa
- **La Nostra Storia** — biografia della pousada (15 anni di attività)
- **Prenota** — agenda di prenotazione con calendario, scelta camera, ospiti e opzione **colazione in casa** aggiungibile alla prenotazione
- **Cosa Vedere** — guida ai luoghi turistici intorno ad Arezzo (Piazza Grande, Cortona, Chianti, Firenze, Siena…)
- **Contatti** — telefono, email, indirizzo e pulsante **WhatsApp** (fab fisso in tutte le pagine)
- **Cadastro cliente** — registrazione utente con email/password
- **Area Riservata** — l'ospite può vedere, gestire e annullare le proprie prenotazioni

## 🎨 Design

- **Palette ispirata alla natura toscana**: verde oliva/bosco come colore primario, accenti caldi color terracotta/oro, sfondo crema naturale
- **Tipografia**: *Cormorant Garamond* (display) + *Inter* (testo) per un mix classico/moderno
- **Dettagli moderni**: bordi arrotondati, ombre soffuse, micro-interazioni e immagini full-bleed

## 🛠️ Stack Tecnico

- **TanStack Start** (React 19 + Vite 7) con SSR
- **TanStack Router** con file-based routing
- **Tailwind CSS v4** + design tokens in `src/styles.css`
- **shadcn/ui** + Lucide icons
- **Lovable Cloud** (Supabase) per autenticazione e database

## 🗃️ Database

Due tabelle principali in PostgreSQL, con Row Level Security:

- `profiles` — dati anagrafici dell'ospite (creato automaticamente al signup)
- `prenotazioni` — soggiorni con check-in/out, camera, ospiti, opzione colazione, stato

Ogni utente può accedere **solo** ai propri dati.

## 📁 Struttura

```
src/
├── routes/
│   ├── __root.tsx         layout, header, footer, WhatsApp fab
│   ├── index.tsx          home
│   ├── storia.tsx         biografia
│   ├── prenota.tsx        form di prenotazione
│   ├── luoghi.tsx         posti da visitare
│   ├── contatti.tsx       contatti + WhatsApp
│   ├── auth.tsx           login / registrazione
│   └── account.tsx        area riservata
├── components/
│   ├── SiteHeader.tsx
│   ├── SiteFooter.tsx
│   └── WhatsAppFab.tsx
├── lib/auth.tsx           AuthProvider (Supabase)
├── assets/                immagini generate
└── styles.css             design system
```

## 🚀 Sviluppo

```bash
bun install
bun run dev
```

## 📞 Contatti (fittizi)

- **Indirizzo**: Via degli Ulivi 27, 52100 Arezzo (AR), Toscana
- **Telefono**: +39 0575 123 456
- **Email**: info@borgocultura.it
- **WhatsApp**: +39 333 123 4567

---

Realizzato con 💚 tra gli ulivi.

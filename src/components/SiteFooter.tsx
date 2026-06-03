import { Leaf, MapPin, Phone, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-soft mt-24">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="font-display text-lg">Borgo Cultura</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Un rifugio tra gli ulivi delle colline di Arezzo — dove la Toscana incontra il presente.
          </p>
        </div>
        <div className="text-sm space-y-2">
          <h4 className="font-display text-base mb-2">Contatti</h4>
          <p className="flex gap-2 items-start"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> Via degli Ulivi 27, 52100 Arezzo (AR), Toscana</p>
          <p className="flex gap-2 items-center"><Phone className="h-4 w-4 text-primary" /> +39 0575 123 456</p>
          <p className="flex gap-2 items-center"><Mail className="h-4 w-4 text-primary" /> info@borgocultura.it</p>
        </div>
        <div className="text-sm">
          <h4 className="font-display text-base mb-2">Orari Reception</h4>
          <p className="text-muted-foreground">Tutti i giorni · 08:00 — 22:00</p>
          <p className="text-muted-foreground mt-2">Check-in: 15:00 — Check-out: 11:00</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Borgo Cultura · Tutti i diritti riservati
      </div>
    </footer>
  );
}

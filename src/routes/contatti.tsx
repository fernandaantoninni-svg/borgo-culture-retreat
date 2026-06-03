import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";

export const Route = createFileRoute("/contatti")({
  head: () => ({
    meta: [
      { title: "Contatti — Borgo Cultura" },
      { name: "description", content: "Come raggiungerci e contattarci. Borgo Cultura, Arezzo, Toscana." },
    ],
  }),
  component: Contatti,
});

function Contatti() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <span className="text-xs uppercase tracking-widest text-accent">Fale Conosco</span>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Contatti</h1>
      <p className="mt-3 text-muted-foreground max-w-xl">
        Siamo a disposizione tutti i giorni. Scrivici, chiamaci o passaci a trovare.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Card icon={MapPin} title="Indirizzo">
          Via degli Ulivi 27<br />52100 Arezzo (AR)<br />Toscana, Italia
        </Card>
        <Card icon={Phone} title="Telefono">
          <a href="tel:+390575123456" className="hover:text-primary">+39 0575 123 456</a>
        </Card>
        <Card icon={Mail} title="Email">
          <a href="mailto:info@borgocultura.it" className="hover:text-primary">info@borgocultura.it</a>
        </Card>
        <Card icon={Clock} title="Reception">
          Tutti i giorni · 08:00 — 22:00<br />Check-in: 15:00 / Check-out: 11:00
        </Card>
      </div>

      <a
        href="https://wa.me/393331234567?text=Ciao%20Borgo%20Cultura!"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-white shadow-soft hover:opacity-90 transition"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="font-medium">Scrivici su WhatsApp · +39 333 123 4567</span>
      </a>
    </div>
  );
}

function Card({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-2xl">{title}</h3>
      <div className="mt-2 text-muted-foreground text-sm leading-relaxed">{children}</div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import piazzaImg from "@/assets/piazza.jpg";
import vineyardImg from "@/assets/vineyard.jpg";
import cortonaImg from "@/assets/cortona.jpg";
import arezzoImg from "@/assets/arezzo.jpg";

export const Route = createFileRoute("/luoghi")({
  head: () => ({
    meta: [
      { title: "Cosa Vedere — Borgo Cultura" },
      { name: "description", content: "I luoghi più belli da visitare intorno ad Arezzo e nella campagna toscana." },
    ],
  }),
  component: Luoghi,
});

const luoghi = [
  { img: piazzaImg, nome: "Piazza Grande", citta: "Arezzo", dist: "15 min", text: "Il cuore medievale di Arezzo, palcoscenico della Giostra del Saracino." },
  { img: arezzoImg, nome: "Basilica di San Francesco", citta: "Arezzo", dist: "15 min", text: "Custodisce gli affreschi di Piero della Francesca." },
  { img: cortonaImg, nome: "Cortona", citta: "Cortona", dist: "40 min", text: "Borgo etrusco arroccato, panorami da cartolina sulla Val di Chiana." },
  { img: vineyardImg, nome: "Strade del Chianti", citta: "Chianti", dist: "1 h", text: "Tour fra vigneti, cantine storiche e degustazioni di Sangiovese." },
  { img: piazzaImg, nome: "Firenze", citta: "Firenze", dist: "1 h", text: "Uffizi, Duomo, Ponte Vecchio — la capitale del Rinascimento." },
  { img: arezzoImg, nome: "Siena & Piazza del Campo", citta: "Siena", dist: "1 h 15", text: "Una delle piazze più belle d’Italia, città del Palio." },
];

function Luoghi() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <span className="text-xs uppercase tracking-widest text-accent">Esperienze</span>
      <h1 className="mt-2 font-display text-4xl md:text-5xl max-w-2xl">Cosa vedere intorno a noi</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Una selezione dei luoghi che amiamo di più — pronti per essere scoperti durante il vostro soggiorno.
      </p>

      <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {luoghi.map((l, i) => (
          <article key={i} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-soft transition">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={l.img} alt={l.nome} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-700" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {l.citta}</span>
                <span>{l.dist} da noi</span>
              </div>
              <h3 className="mt-2 font-display text-2xl">{l.nome}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{l.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

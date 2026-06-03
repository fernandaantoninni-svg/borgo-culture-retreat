import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Coffee, Leaf, MapPin, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import roomImg from "@/assets/room.jpg";
import breakfastImg from "@/assets/breakfast.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Borgo Cultura — Pousada tra gli ulivi di Arezzo" },
      { name: "description", content: "Quindici anni di ospitalità toscana tra natura, arte e cucina. Prenota la tua fuga ad Arezzo." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
        <img src={heroImg} alt="Borgo Cultura al tramonto" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1280} />
        <div className="absolute inset-0 bg-hero" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-20 text-primary-foreground">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs uppercase tracking-widest backdrop-blur">
            <Leaf className="h-3 w-3" /> Arezzo · Toscana
          </span>
          <h1 className="mt-5 font-display text-5xl leading-tight md:text-7xl max-w-3xl">
            Borgo Cultura
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            Una pousada immersa tra ulivi e cipressi, dove la quiete della campagna toscana incontra il design contemporaneo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/prenota" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-soft hover:opacity-90 transition">
              Prenota ora <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/storia" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm hover:bg-white/10 transition">
              Scopri la storia
            </Link>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: Leaf, title: "Natura toscana", text: "Un ettaro di uliveto, giardino aromatico e vista sulle colline aretine." },
            { icon: Coffee, title: "Colazione su misura", text: "Aggiungi la nostra colazione artigianale italiana alla tua prenotazione." },
            { icon: MapPin, title: "Vicino a tutto", text: "15 minuti dal centro storico di Arezzo, a un’ora da Firenze e Siena." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-7 shadow-card hover:shadow-soft transition">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-2xl">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ROOMS */}
      <section className="bg-soft py-20">
        <div className="mx-auto max-w-6xl px-4 grid gap-12 md:grid-cols-2 items-center">
          <img src={roomImg} alt="Camera della pousada" className="rounded-3xl shadow-soft" loading="lazy" width={1280} height={960} />
          <div>
            <span className="text-xs uppercase tracking-widest text-accent">Le Camere</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Comfort che racconta la terra</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Sei camere uniche, ricavate dall’antico casolare in pietra. Lino naturale, legno toscano, dettagli moderni e vista sugli ulivi: tutto pensato per riposare bene e svegliarsi felici.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex gap-2"><Sparkles className="h-4 w-4 text-accent" /> Camera Classica · da €120 / notte</li>
              <li className="flex gap-2"><Sparkles className="h-4 w-4 text-accent" /> Camera Superior con vista · da €165 / notte</li>
              <li className="flex gap-2"><Sparkles className="h-4 w-4 text-accent" /> Suite degli Ulivi · da €230 / notte</li>
            </ul>
            <Link to="/prenota" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground hover:opacity-90 transition">
              Verifica disponibilità <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* BREAKFAST */}
      <section className="mx-auto max-w-6xl px-4 py-20 grid gap-12 md:grid-cols-2 items-center">
        <div className="md:order-2">
          <img src={breakfastImg} alt="Colazione italiana" className="rounded-3xl shadow-soft" loading="lazy" width={1280} height={960} />
        </div>
        <div className="md:order-1">
          <span className="text-xs uppercase tracking-widest text-accent">Colazione in Casa</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Il risveglio toscano</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Cornetti caldi, marmellate fatte in casa, frutta dell’orto, formaggi locali, cappuccino. Puoi aggiungere la colazione direttamente alla tua prenotazione — servita in sala o sul terrazzo tra gli ulivi.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">+€15 a persona / giorno</span> — disponibile in fase di prenotazione.
          </p>
        </div>
      </section>
    </>
  );
}
